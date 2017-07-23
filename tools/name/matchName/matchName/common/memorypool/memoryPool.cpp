#include "memoryPool.h"
#include <memory.h>
#include <stdlib.h>
#include <stdio.h>
#include <assert.h>


memoryPool::memoryPool()
{
	_pFirstBlock = nullptr;
	_pNowBlock = nullptr;
	_pPathBlock = nullptr;
	_pPathItem = nullptr;
	_alignBytes = 0;
	_itemsPerBlock = 0;
	_pNextItem = nullptr;
	_deaditemstack = nullptr;
	_maxItems = 0;
	_isInit = 0;
	_memorySize = 0;
	_type = E_MEMORY_NONE;
}

memoryPool::~memoryPool()
{
	while (_pFirstBlock != nullptr)
	{
		_pNowBlock = (Void**)*(_pFirstBlock);
		_triFree(_pFirstBlock);
		_pFirstBlock = _pNowBlock;
	}
	_pFirstBlock = nullptr;
}

Void* memoryPool::_triMalloc(unsigned int size)
{
	Void* ptr = nullptr;
	ptr = malloc(size);
	
	assert(ptr, "");
	return ptr;
}
void memoryPool::_triFree(Void* p)
{
	if (p)
		free(p);
}

bool	memoryPool::isInit() const
{
	return _isInit;
}

int memoryPool::checkMemory(void* p)
{
	if (!p) return false;
	int ret = 0;
	Void* pTemp = _pFirstBlock;
	while (pTemp)
	{
		ret++;
		int size = *(int*)((char*)_pFirstBlock + sizeof(void*));
		if (p > pTemp && p <= (char*)pTemp + size)
		{
			return ret;
		}
		pTemp = *(Void**)pTemp;
	}
	return 0;
}

Void** memoryPool::_getBlock(void* p)
{
	if (!p) return nullptr;
	Void* pTemp = _pFirstBlock;
	while (pTemp)
	{
		int size = *(int*)((char*)pTemp + sizeof(void*));
		if (p > pTemp && p < (char*)pTemp + size)
		{
			return (void**)pTemp;
		}
		pTemp = *(Void**)pTemp;
	}
	return nullptr;
}

void* singleSizeMemoryPool::poolItemPoint(int item)
{
	if (item > _items || item < 0) return nullptr;
	Void** pBlock = _pFirstBlock;
	unsigned long alignptr = 0;
	void* pfirstItem = nullptr;
	int itemTemp = item;
	while (pBlock)
	{
		int size = (((*(int*)((char*)pBlock + sizeof(void*))) - sizeof(Void*) - sizeof(int) - _alignBytes)) / _itemBytes;
		if (itemTemp >= size)
		{
			itemTemp -= size;
			pBlock = (Void**)*pBlock;
		}
		else
		{
			alignptr = (unsigned long)(pBlock + 1) + sizeof(int);
			pfirstItem = (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));
			pfirstItem = (Void*)((char*)pfirstItem + ((itemTemp) * _itemBytes));
			return pfirstItem;
		}
	}
	return nullptr;
}

int singleSizeMemoryPool::poolItemIndex(void* p)
{
	if (!p) return -1;
	int index = 0;
	Void* pTemp = _pFirstBlock;
	while (pTemp)
	{
		int size = *(int*)((char*)pTemp + sizeof(void*));
		if (p > pTemp && p < (char*)pTemp + size)
		{
			unsigned long pDiff = ((unsigned long)p - (unsigned long)pTemp - sizeof(Void*) - sizeof(int) - _alignBytes) / _itemBytes;
			index += pDiff;
			if (index > _items)
				int a = 0;
			return index;
		}
		pTemp = *(Void**)pTemp;
		index += (size - sizeof(Void*) - sizeof(int) - _alignBytes) / _itemBytes;
	}
	return -1;
}

void singleSizeMemoryPool::poolDealloc(void* p, size_t item)
{
	Void** pBlock = _getBlock(p);
	assert(pBlock, "");
	size_t itemSize = item;
	int size = ((unsigned long)((char*)pBlock + ((*(int*)((char*)pBlock + sizeof(void*)))) - (unsigned long)p)) / _itemBytes;
	size_t blockOffset = 0;
	unsigned long alignptr = 0;
	void *pItem = p;
	do
	{
		if (size < itemSize)
		{
			itemSize -= size;
		}
		else
		{
			if ((char*)pItem + (itemSize * _itemBytes) == _pNextItem)
			{
				_pNextItem = p;
				_items -= item;
				_unallocatedItems += item;
				_pNowBlock = _getBlock(p);
				return;
			}
		}
		pBlock = (Void**)*pBlock;
		if (pBlock)
		{
			size = ((*(int*)((char*)pBlock + sizeof(void*))) - (sizeof(Void*) + sizeof(int) + _alignBytes)) / _itemBytes;
			alignptr = (unsigned long)(pBlock + 1) + sizeof(int);
			pItem = (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));
		}
		
	} while (pBlock);

	size_t count = item;
	pItem = p;
	pBlock = _getBlock(p);
	for (int i = 0; i < item; i++)
	{
		poolDealloc(pItem);
		pItem = (char*)pItem + _itemBytes;
		if (pItem >= (char*)pBlock + size)
		{
			pBlock = (Void**)*pBlock;

			if (pBlock)
			{
				alignptr = (unsigned long)(pBlock + 1) + sizeof(int);
				pItem = (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));
			}
			else
			{
				return;
			}
		}
	}
	
}

void* memoryPool::poolNextItem()
{
	return _pNextItem;
}

int memoryPool::poolBlockSize(int block)
{
	Void **pBlock = _pFirstBlock;
	for (int i = 0; i < block - 1; ++i)
	{
		pBlock = (Void**)*pBlock;
	}
	return (*(int*)((char*)pBlock + sizeof(Void*))) - (sizeof(Void*) + sizeof(int) + _alignBytes);
}

int memoryPool::poolBlockCount()
{
	int count = 0;
	Void **pBlock = _pFirstBlock;
	while (pBlock)
	{
		count++;
		pBlock = (Void**)*pBlock;
	}
	return count;
}

void* memoryPool::poolBlockFirstPoint(int block)
{
	Void **pBlock = _pFirstBlock;
	unsigned long alignptr = 0;
	if (block)
	{
		for (int i = 0; i < block; ++i)
		{
			pBlock = (Void**)*pBlock;
		}
	
	}
	if (!pBlock) return nullptr;
	alignptr = (unsigned long)(pBlock + 1) + sizeof(int);
	return (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));
	
}

singleSizeMemoryPool::singleSizeMemoryPool() : memoryPool()
{
	_itemsFirstBlock = 0;
	_itemBytes = 0;
	_unallocatedItems = 0;
	_items = 0;
	_pathItemsLeft = 0;
	_type = E_MEMORY_SINGLE_SIZE;
}


//if (item > _items || item < 0) return nullptr;
//Void** pBlock = _pFirstBlock;
//unsigned long alignptr = 0;
//void* pfirstItem = nullptr;
//int itemTemp = item;
//while (pBlock)
//{
//	int size = (((*(int*)((char*)pBlock + sizeof(void*))) - sizeof(Void*) - sizeof(int) - _alignBytes)) / _itemBytes;
//	if (itemTemp > size)
//	{
//		itemTemp -= size;
//		pBlock = (Void**)*pBlock;
//	}
//	else
//	{
//		alignptr = (unsigned long)(pBlock + 1) + sizeof(int);
//		pfirstItem = (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));
//		pfirstItem = (Void*)((char*)pfirstItem + ((itemTemp)* _itemBytes));
//		return pfirstItem;
//	}
//}
//return nullptr;

bool	singleSizeMemoryPool::traversalinit(void* p)
{
	_pPathBlock = _getBlock(p);
	if (!_pPathBlock)
		return false;
	int size = (*(int*)((char*)_pPathBlock + sizeof(void*)));
	unsigned long iTemIndex = (unsigned long)p - (unsigned long)_pPathBlock - sizeof(Void*) - sizeof(int) - _alignBytes;
	if ((iTemIndex % _itemBytes))
	{
		_pPathItem = nullptr;
		_pPathBlock = nullptr;
		return false;
	}
	_pPathItem = p;
	return true;
}

void*	singleSizeMemoryPool::traverse()
{
	if (_pPathItem == _pNextItem || !_pPathItem || !_pPathBlock) return nullptr;
	int size = (*(int*)((char*)_pPathBlock + sizeof(void*)));
	void* pBlock = (char*)_pPathBlock + size;
	if (_pPathItem >= pBlock)
	{
		_pPathBlock = (void**)(*_pPathBlock);
		if (!_pPathBlock)
		{
			_pPathItem = nullptr;
			return nullptr;
		}
		unsigned long alignptr = 0;
		alignptr = (unsigned long)(_pPathBlock + 1) + sizeof(int);
		_pPathItem = (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));
	}
	void* newItem = _pPathItem;

	_pPathItem = (char*)_pPathItem + _itemBytes;

	return newItem;
}

mulSizeMemoryPool::mulSizeMemoryPool() : memoryPool()
{
	_singleItemStore = nullptr;
	_type = E_MEMORY_MUL_SIZE;
}

E_MEMORY_TYPE memoryPool::getType() const
{
	return _type;
}

long singleSizeMemoryPool::getItems() const 
{
	return _items;
}

long mulSizeMemoryPool::getItems() const
{
	return _maxItems;
}

long memoryPool::getMaxItems() const
{
	return _maxItems;
}

size_t memoryPool::getMemorySize()
{
	return _memorySize;
}

size_t	memoryPool::getAlignBytes()const
{
	return _alignBytes;
}

void singleSizeMemoryPool::poolRestart()
{
	unsigned long alignptr = 0;
	_items = 0;
	_maxItems = 0;

	_pNowBlock = _pFirstBlock;

	alignptr = (unsigned long)(_pNowBlock + 1) + sizeof(int);

	_pNextItem = (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));

	_unallocatedItems = _itemsFirstBlock;

	_deaditemstack = nullptr;
}

int singleSizeMemoryPool::poolItemSize()
{
	return _itemBytes;
}



bool singleSizeMemoryPool::poolInit(int byteCount, int itemCount, int firstItemCount, int alignment)
{
	if (alignment > sizeof(Void*))
	{
		_alignBytes = alignment;
	}
	else
	{
		_alignBytes = sizeof(Void*);
	}

	_itemBytes = ((byteCount - 1) / _alignBytes + 1) * _alignBytes;

	_itemsPerBlock = itemCount;

	if (firstItemCount == 0)
	{
		_itemsFirstBlock = itemCount;
	}
	else
	{
		_itemsFirstBlock = firstItemCount;
	}

	_pFirstBlock = (Void**)_triMalloc(_itemsFirstBlock * _itemBytes + sizeof(Void*) + sizeof(int) +  _alignBytes);
	if (!_pFirstBlock)
		return false;

	_memorySize += _itemsFirstBlock * _itemBytes + sizeof(Void*) + sizeof(int) + _alignBytes;
	

	*(_pFirstBlock) = nullptr;

	*(int*)((char*)_pFirstBlock + sizeof(Void*)) = _itemsFirstBlock * _itemBytes + sizeof(Void*) + sizeof(int) + _alignBytes;
	poolRestart();
	_isInit = true;
	return true;
}

void* singleSizeMemoryPool::poolAlloc()
{
	Void *newItem;
	Void **newBlock;
	unsigned long alignptr;

	if (_deaditemstack != nullptr)
	{
		newItem = _deaditemstack;
		_deaditemstack = *(Void**)_deaditemstack;
	}
	else
	{
		if (_unallocatedItems == 0)
		{
			if (*(_pNowBlock) == nullptr)
			{
				newBlock = (Void**)_triMalloc(_itemsPerBlock * _itemBytes + sizeof(Void*) + sizeof(int) + _alignBytes);
				*(_pNowBlock) = (Void*)newBlock;
				int* pSize = (int*)((char*)newBlock + sizeof(Void*));
				*pSize = _itemsPerBlock * _itemBytes + sizeof(Void*) + sizeof(int) + _alignBytes;
				_memorySize += _itemsPerBlock * _itemBytes + sizeof(Void*) + sizeof(int) + _alignBytes;
				*newBlock = nullptr;
			}
			_pNowBlock = (Void**)*(_pNowBlock);
			alignptr = (unsigned long)(_pNowBlock + 1) + sizeof(int);

			_pNextItem = (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));

			_unallocatedItems = _itemsPerBlock;
		}

		newItem = _pNextItem;
		if (_unallocatedItems > 1 && (Void*)((char*)_pNextItem + _itemBytes) == (Void*)((char*)_pNowBlock + *(int*)((char*)_pNowBlock + sizeof(Void*))))
		{
			_pNowBlock = (Void**)*(_pNowBlock);
			alignptr = (unsigned long)(_pNowBlock + 1) + sizeof(int);
			_pNextItem = (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));
		}
		else
		{
			_pNextItem = (Void*)((char*)_pNextItem + _itemBytes);
		}
		
		_unallocatedItems--;
		_maxItems++;
	}
	_items++;
	return newItem;
}

void singleSizeMemoryPool::poolDealloc(void* dyingItem)
{
	*((Void**)dyingItem) = _deaditemstack;
	_deaditemstack = dyingItem;
	_items--;
}

void mulSizeMemoryPool::poolRestart()
{
	unsigned long alignptr = 0;

	_maxItems = 0;

	_pNowBlock = _pFirstBlock;

	alignptr = (unsigned long)(_pNowBlock + 1) + sizeof(int);

	_pNextItem = (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));

	_deaditemstack = nullptr;

	_singleItemStore = nullptr;
}

bool mulSizeMemoryPool::poolInit(size_t memoryCount, int alignment)
{
	if (alignment > sizeof(Void*))
	{
		_alignBytes = alignment;
	}
	else
	{
		_alignBytes = sizeof(Void*);
	}

	_itemsPerBlock = memoryCount;

	_pFirstBlock = (Void**)_triMalloc(_itemsPerBlock * _alignBytes + sizeof(Void*) + sizeof(int) + _alignBytes);
	if (!_pFirstBlock)
		return false;
	*(int*)((char*)_pFirstBlock + sizeof(Void*)) = _itemsPerBlock * _alignBytes + sizeof(Void*) + sizeof(int) + _alignBytes;
	_memorySize += _itemsPerBlock * _alignBytes + sizeof(Void*) + sizeof(int) + _alignBytes;

	*(_pFirstBlock) = nullptr;
	poolRestart();
	_isInit = true;
	return true;
}



void* mulSizeMemoryPool::poolAlloc(size_t size)
{
	Void *newItem = nullptr;
	Void **newBlock = nullptr;;
	unsigned long alignptr;

	size_t newItemSize = ((size - 1) / _alignBytes + 1) * _alignBytes;

	bool isNewItem = true;

	if (_singleItemStore != nullptr || _deaditemstack != nullptr)
	{
		if (newItemSize == _alignBytes && _singleItemStore)
		{
			newItem = _singleItemStore;
			_singleItemStore = *(Void**)_singleItemStore;
			isNewItem = false;
			_maxItems++;
		}
		else
		{
			Void* pStore = _deaditemstack;
			Void* pParentStore = nullptr;
#if MEMORY_POOL_RANDOM_ALLOC
			while (pStore)
			{
				size_t storeSize = *(int*)((char*)pStore + _alignBytes);
				if (storeSize == newItemSize)
				{
					if (pParentStore)
					{
						*(Void**)pParentStore = *(Void**)pStore;
					}
					else
					{
						_deaditemstack = *(Void**)_deaditemstack;
					}
					newItem = pStore;
					isNewItem = false;
					_maxItems++;
					break;
				}
				else if (storeSize > newItemSize)
				{
					size_t difference = storeSize - newItemSize;
					if (difference == _alignBytes)
					{
						if (pParentStore)
						{
							*(Void**)pParentStore = *(Void**)pStore;
						}
						else
						{
							_deaditemstack = *(Void**)_deaditemstack;
						}
						newItem = pStore;
						*(Void**)((char*)newItem + newItemSize) = _singleItemStore;
						_singleItemStore = (Void*)((char*)newItem + newItemSize);
						isNewItem = false;
						_maxItems++;
						break;
					}
					else
					{
						if (pParentStore)
						{
							Void* temp = (char*)pStore + newItemSize;
							*(Void**)(temp) = *(Void**)pStore;
							*(int*)((char*)temp + _alignBytes) = difference;
							*(Void**)pParentStore = temp;
							newItem = pStore;
						}
						else
						{
							Void* temp = (char*)_deaditemstack + newItemSize;
							*(Void**)(temp) = *(Void**)_deaditemstack;
							*(int*)((char*)temp + _alignBytes) = difference;
							newItem = _deaditemstack;
							_deaditemstack = temp;
						}
						isNewItem = false;
						_maxItems++;
						break;
					}
				}
				pParentStore = pStore;
				pStore = *(Void**)pStore;
			}
#else
			Void* pStoreTemp = nullptr;
			Void* pParentStoreTemp = nullptr;

			int sizeTemp = INT_MAX;

			while (pStore)
			{
				int storeSize = *(int*)((char*)pStore + _alignBytes);
				int diff = storeSize - newItemSize;
				if (diff >= 0 && diff < sizeTemp)
				{
					pStoreTemp = pStore;
					pParentStoreTemp = pParentStore;
					sizeTemp = diff;
					if (!diff)
					{
						break;
					}
				}
				pParentStore = pStore;
				pStore = *(Void**)pStore;
			}
			if (pStoreTemp)
			{
				pStore = pStoreTemp;
				pParentStore = pParentStoreTemp;

				size_t storeSize = *(int*)((char*)pStore + _alignBytes);
				if (storeSize == newItemSize)
				{
					if (pParentStore)
					{
						*(Void**)pParentStore = *(Void**)pStore;
					}
					else
					{
						_deaditemstack = *(Void**)_deaditemstack;
					}
					newItem = pStore;
					isNewItem = false;
					_maxItems++;
				}
				else if (storeSize > newItemSize)
				{
					size_t difference = storeSize - newItemSize;
					if (difference == _alignBytes)
					{
						if (pParentStore)
						{
							*(Void**)pParentStore = *(Void**)pStore;
						}
						else
						{
							_deaditemstack = *(Void**)_deaditemstack;
						}
						newItem = pStore;
						*(Void**)((char*)newItem + newItemSize) = _singleItemStore;
						_singleItemStore = (Void*)((char*)newItem + newItemSize);
						isNewItem = false;
						_maxItems++;
					}
					else
					{
						if (pParentStore)
						{
							Void* temp = (char*)pStore + newItemSize;
							*(Void**)(temp) = *(Void**)pStore;
							*(int*)((char*)temp + _alignBytes) = difference;
							*(Void**)pParentStore = temp;
							newItem = pStore;
						}
						else
						{
							Void* temp = (char*)_deaditemstack + newItemSize;
							*(Void**)(temp) = *(Void**)_deaditemstack;
							*(int*)((char*)temp + _alignBytes) = difference;
							newItem = _deaditemstack;
							_deaditemstack = temp;
						}
						isNewItem = false;
						_maxItems++;
					}
				}
			}
#endif
		}
	}

	if (isNewItem)
	{
		unsigned long freeSize = ((unsigned long)_pNowBlock) + _itemsPerBlock * _alignBytes + sizeof(Void*) + _alignBytes - ((unsigned long)_pNextItem);
		if (newItemSize > freeSize)
		{
			poolDealloc(_pNextItem, freeSize);
			if (*(_pNowBlock) == nullptr)
			{
				if (_itemsPerBlock * _alignBytes > newItemSize * 2)
				{
					newBlock = (Void**)_triMalloc(_itemsPerBlock * _alignBytes + sizeof(Void*) + sizeof(int) + _alignBytes);
					*(_pNowBlock) = (Void*)newBlock;
					*(int*)((char*)newBlock + sizeof(Void*)) = _itemsPerBlock * _alignBytes + sizeof(Void*) + sizeof(int) + _alignBytes;
				}
				else
				{
					newBlock = (Void**)_triMalloc(newItemSize * 2);
					*(_pNowBlock) = (Void*)newBlock;
					*(int*)((char*)newBlock + sizeof(Void*)) = newItemSize * 2;
				}
				_memorySize += _itemsPerBlock * _alignBytes + sizeof(Void*) + sizeof(int) + _alignBytes;
				*newBlock = nullptr;
			}
			_pNowBlock = (Void**)*(_pNowBlock);
			alignptr = (unsigned long)(_pNowBlock + 1) + sizeof(int);
			_pNextItem = (Void*)(alignptr + (unsigned long)_alignBytes - (alignptr % (unsigned long)_alignBytes));
		}

		newItem = _pNextItem;
		_pNextItem = (Void*)((char*)_pNextItem + newItemSize);
		_maxItems++;
	}
	return newItem;
}

void  mulSizeMemoryPool::poolDealloc(void* dyingItem, size_t size)
{
	size_t _size = ((size - 1) / _alignBytes + 1) * _alignBytes;

	Void* pItem = dyingItem;
	Void* pStore = _singleItemStore;
	Void* pParentStore = nullptr;

	while (pStore != nullptr)
	{
		size_t storeSize = _alignBytes;
		if ((Void*)((char*)pItem + _size) == pStore)
		{
			if (pParentStore)
			{
				*(Void**)pParentStore = *(Void**)pStore;
			}
			else
			{
				_singleItemStore = *(Void**)pStore;
				pParentStore = nullptr;
			}
			pStore = *(Void**)pStore;
			_size += _alignBytes;
			storeSize = _size;
		}
		else if ((Void*)((char*)pStore + storeSize) == pItem)
		{
			if (pParentStore)
			{
				*(Void**)pParentStore = *(Void**)pStore;
			}
			else
			{
				_singleItemStore = *(Void**)pStore;
				pParentStore = nullptr;
			}
			pItem = pStore;
			pStore = *(Void**)pStore;
			_size += _alignBytes;
		}
		else
		{
			//if (!pStore) break;
			pParentStore = pStore;
			pStore = *(Void**)pStore;
		}
	}

	pStore = _deaditemstack;
	pParentStore = nullptr;

	while (pStore != nullptr)
	{
		size_t storeSize = *(int*)((char*)pStore + _alignBytes);
		if ((Void*)((char*)pItem + _size) == pStore)
		{
			if (pParentStore)
			{
				*(Void**)pParentStore = *(Void**)pStore;
			}
			else
			{
				_deaditemstack = *(Void**)_deaditemstack;
				pParentStore = nullptr;
			}

			pStore = *(Void**)pStore;
			_size += storeSize;
			storeSize = _size;
		}
		else if ((Void*)((char*)pStore + storeSize) == pItem)
		{
			if (pParentStore)
			{
				*(Void**)pParentStore = *(Void**)pStore;
			}
			else
			{
				_deaditemstack = *(Void**)_deaditemstack;
				pParentStore = nullptr;
			}
			pItem = pStore;
			pStore = *(Void**)pStore;
			_size += storeSize;
		}
		else
		{
			//if (!pStore) break;
			pParentStore = pStore;
			pStore = *(Void**)pStore;
		}
	}

	if (((char*)pItem + _size) == _pNextItem)
	{
		_pNextItem = pItem;
		_maxItems--;
		return;
	}

	if (_size == _alignBytes)
	{
		if (pItem != _singleItemStore)
		{
			*((Void**)pItem) = _singleItemStore;
			_singleItemStore = pItem;
		}
	}
	else
	{
		if (pItem != _deaditemstack)
		{
			*((Void**)pItem) = _deaditemstack;
			_deaditemstack = pItem;
		}
		*(int*)((char*)_deaditemstack + _alignBytes) = _size;
	}
	_maxItems--;
	pStore = _deaditemstack;
	return;
}

mulSizeMemoryPool::~mulSizeMemoryPool()
{
	while (_pFirstBlock != nullptr)
	{
		_pNowBlock = (Void**)*(_pFirstBlock);
		_triFree(_pFirstBlock);
		_pFirstBlock = _pNowBlock;
	}
	_pFirstBlock = nullptr;
}

singleSizeMemoryPool::~singleSizeMemoryPool()
{
	while (_pFirstBlock != nullptr)
	{
		_pNowBlock = (Void**)*(_pFirstBlock);
		_triFree(_pFirstBlock);
		_pFirstBlock = _pNowBlock;
	}
	_pFirstBlock = nullptr;
}