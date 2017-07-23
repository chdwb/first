#include "memoryPoolManager.h"

memoryPoolManager* memoryPoolManager::_instance = nullptr;

memoryPoolManager* memoryPoolManager::getInstance()
{
	if (!_instance)
		_instance = new memoryPoolManager();
	return _instance;
}

memoryPoolManager::memoryPoolManager()
{

}

memoryPoolManager::~memoryPoolManager()
{
	V_memoryPool::iterator it = _memoryPool.begin();
	for (it; it != _memoryPool.end(); ++it)
	{
		delete(*it).second;
	}
	_memoryPool.clear();
}

void		memoryPoolManager::release()
{
	
	delete _instance;
	_instance = nullptr;
}

memoryPool* memoryPoolManager::makeMemoryPool(const char* poolName, E_MEMORY_TYPE type)
{
	memoryPool	*p = nullptr;
	switch (type)
	{
		case E_MEMORY_SINGLE_SIZE:
			p = new singleSizeMemoryPool();
			break;
		case E_MEMORY_MUL_SIZE:
			p = new mulSizeMemoryPool();
			break;
		case E_MEMORY_NONE:
		default:
			return p;
	}
	if (p != nullptr)
	{
		_memoryPool.insert(std::pair<std::string, memoryPool*>(poolName, p));
	}
	return p;
}

memoryPool* memoryPoolManager::makeMemoryPool(const char* poolName, int itemByteSize, int itemPreCount, int initItemCount, int alignment)
{
	singleSizeMemoryPool* p = dynamic_cast<singleSizeMemoryPool*>(makeMemoryPool(poolName, E_MEMORY_SINGLE_SIZE));
	if (!p) return nullptr;

	if (p->poolInit(itemByteSize, itemPreCount, initItemCount, alignment))
	{
		return p;
	}
	else
	{
		_memoryPool.erase(poolName);
		if (p != nullptr)
		{
			delete p;
			p = nullptr;
		}
		return nullptr;
	}
}

memoryPool* memoryPoolManager::makeMemoryPool(const char* poolName, size_t memoryCount, int alignment)
{
	mulSizeMemoryPool* p = dynamic_cast<mulSizeMemoryPool*>(makeMemoryPool(poolName, E_MEMORY_MUL_SIZE));
	if (!p) return nullptr;
	if (p->poolInit(memoryCount,alignment))
	{
		return p;
	}
	else
	{
		_memoryPool.erase(poolName);
		if (p != nullptr)
		{
			delete p;
			p = nullptr;
		}
		return nullptr;
	}
}

bool		memoryPoolManager::initPool(const char* poolName, int itemByteSize, int itemPreCount, int initItemCount, int alignment)
{
	V_memoryPool::iterator it = _memoryPool.find(poolName);
	if (it == _memoryPool.end())
		return false;
	else
	{
		memoryPool	*p = (*it).second;
		if (p->isInit())
			return true;
		else
		{
			singleSizeMemoryPool* sp = dynamic_cast<singleSizeMemoryPool*>(p);
			if (sp && sp->getType() == E_MEMORY_SINGLE_SIZE)
			{
				return sp->poolInit(itemByteSize, itemPreCount, initItemCount, alignment);
			}
			else
			{
				return false;
			}
		}
	}
}
bool		memoryPoolManager::initPool(const char* poolName, size_t memoryCount, int alignment)
{
	V_memoryPool::iterator it = _memoryPool.find(poolName);
	if (it == _memoryPool.end())
		return false;
	else
	{
		memoryPool	*p = (*it).second;
		if (p->isInit())
			return true;
		else
		{
			mulSizeMemoryPool* sp = dynamic_cast<mulSizeMemoryPool*>(p);
			if (sp && sp->getType() == E_MEMORY_SINGLE_SIZE)
			{
				return sp->poolInit(memoryCount, alignment);
			}
			else
			{
				return false;
			}
		}
	}
	return false;
}

bool		memoryPoolManager::removePool(const char* poolName)
{
	V_memoryPool::iterator it = _memoryPool.find(poolName);
	if (it == _memoryPool.end())
		return false;
	else
	{
		_memoryPool.erase(poolName);
		delete (*it).second;
		return true;
	}
	return false;
}

bool		memoryPoolManager::removePool(memoryPool *mp)
{
	if (!mp)
		return false;
	V_memoryPool::iterator it = _memoryPool.begin();
	std::string name = "";
	for (it; it != _memoryPool.end(); ++it)
	{
		if (mp == (*it).second)
		{
			name = (*it).first;
			break;
		}
	}
	return removePool(name.c_str());
}

Void*		memoryPoolManager::allocPool(const char* poolName)
{
	V_memoryPool::iterator it = _memoryPool.find(poolName);
	if (it == _memoryPool.end())
		return nullptr;
	else
	{
		return allocPool((*it).second);
	}
	return nullptr;
}

Void*		memoryPoolManager::allocPool(memoryPool* pool)
{
	singleSizeMemoryPool* sp = dynamic_cast<singleSizeMemoryPool*>(pool);
	if (sp)
	{
		return sp->poolAlloc();
	}
	return nullptr;
}

Void*		memoryPoolManager::allocPool(const char* poolName, size_t size)
{
	V_memoryPool::iterator it = _memoryPool.find(poolName);
	if (it == _memoryPool.end())
		return nullptr;
	else
	{
		return allocPool((*it).second, size);
	}
	return nullptr;
}
Void*		memoryPoolManager::allocPool(memoryPool* pool, size_t size)
{
	mulSizeMemoryPool* sp = dynamic_cast<mulSizeMemoryPool*>(pool);
	if (sp)
	{
		return sp->poolAlloc(size);
	}
	return nullptr;
}

bool		memoryPoolManager::deallocPool(const char* poolName, Void** pItem)
{
	V_memoryPool::iterator it = _memoryPool.find(poolName);
	if (it == _memoryPool.end() || !(*pItem))
		return false;
	else
	{
		return deallocPool((*it).second, pItem);
	}
	return false;
}
bool		memoryPoolManager::deallocPool(memoryPool* pool, Void** pItem)
{
	singleSizeMemoryPool* sp = dynamic_cast<singleSizeMemoryPool*>(pool);
	if (sp)
	{
		if (sp->checkMemory(*pItem))
		{
			sp->poolDealloc(*pItem);
			*pItem = nullptr;
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
	return false;
}

bool		memoryPoolManager::deallocPool(const char* poolName, Void** pItem, size_t size)
{
	V_memoryPool::iterator it = _memoryPool.find(poolName);
	if (it == _memoryPool.end() || !(*pItem))
		return false;
	else
	{
		return deallocPool((*it).second, pItem);
	}
	return false;
}
bool		memoryPoolManager::deallocPool(memoryPool* pool, Void** pItem, size_t size)
{
	mulSizeMemoryPool* sp = dynamic_cast<mulSizeMemoryPool*>(pool);
	if (sp)
	{
		if (sp->checkMemory(*pItem))
		{
			sp->poolDealloc(*pItem, size);
			*pItem = nullptr;
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
	return false;
}

memoryPool* memoryPoolManager::getMemory(const char* poolName)
{
	V_memoryPool::iterator it = _memoryPool.find(poolName);
	if (it == _memoryPool.end())
		return nullptr;
	else
	{
		return (*it).second;
	}
}