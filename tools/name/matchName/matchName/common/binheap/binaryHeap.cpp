#include "binaryHeap.h"
#include <assert.h>

binaryHeap::binaryHeap(uint32_t n, bool(*f)(const void*, const void*)) :
_heap(0),
_capacity(n),
_size(0),
_compareFunc(f)
{
	_heap = new (std::nothrow) void*[_capacity];
	assert(_heap,"");
	memset(_heap, 0, sizeof(void*));
}
binaryHeap::binaryHeap():
	_heap(0),
	_capacity(0),
	_size(0),
	_compareFunc(nullptr)
{

}

void binaryHeap::setCompareFunc(bool(*f)(const void*, const  void*))
{
	_compareFunc = f;
}


void binaryHeap::setHeapSise(uint32_t n)
{
	if (n > _capacity)
	{
		if (_heap)
		{
			delete[] _heap;
			_heap = nullptr;
		}
		_capacity = n;
		_heap = new (std::nothrow) void*[_capacity];
		assert(_heap, "");
		memset(_heap, 0, sizeof(void*));
	}
	clear();
}

binaryHeap::~binaryHeap()
{
	if (_heap)
	{
		delete[] _heap;
		_heap = nullptr;
	}
}

void binaryHeap::_bubbleUp(int i, void* node)
{
	int parent = (i - 1) / 2;
	while ((i>0) && _compareFunc(_heap[parent], node))
	{
		_heap[i] = _heap[parent];
		i = parent;
		parent = (i - 1) / 2;
	}
	_heap[i] = node;
}

void binaryHeap::_trickleDown(int i, void* node)
{
	int child = (i * 2) + 1;
	while (child < _size)
	{
		if (((child + 1) < _size) &&
			_compareFunc(_heap[child], _heap[child + 1])
		)
		{
			child++;
		}
		_heap[i] = _heap[child];
		i = child;
		child = (i * 2) + 1;
	}
	_bubbleUp(i, node);
}

hashSearch::hashSearch(uint32_t maxNodes, bool(*f)(const void*, const void*)) :
	_nodeCount(0),
	_maxNodes(maxNodes),
	_first (nullptr),
	_next(nullptr)
{
	_hashSize = convert_pow2(maxNodes >> 2);
	_first = new (std::nothrow)uint32_t[_hashSize];
	_next = new (std::nothrow)uint32_t[_maxNodes];
	_nodes = new (std::nothrow)void*[_maxNodes];

	assert(_first, "");
	assert(_next, "");
	assert(_nodes, "");

	_isEquale = f;
	memset(_first, 0xff, sizeof(uint32_t) * _hashSize);
	memset(_next, 0xff, sizeof(uint32_t) * _hashSize);
}
hashSearch::hashSearch(uint32_t maxNodes, uint32_t hashSize, bool(*f)(const void*, const void*)) :
_nodeCount(0),
_maxNodes(maxNodes),
_first(nullptr),
_next(nullptr)
{
	_hashSize = convert_pow2(hashSize);
	_first = new (std::nothrow)uint32_t[_hashSize];
	_next = new (std::nothrow)uint32_t[_maxNodes];
	_nodes = new (std::nothrow)void*[_maxNodes];

	assert(_first, "");
	assert(_next, "");
	assert(_nodes, "");

	_isEquale = f;
	memset(_first, 0xff, sizeof(uint32_t) * _hashSize);
	memset(_next, 0xff, sizeof(uint32_t) * _maxNodes);
}
hashSearch::~hashSearch()
{
	if (_first)
	{
		delete[] _first;
		_first = nullptr;
	}
	if (_next)
	{
		delete[] _next;
		_next = nullptr;
	}
	if (_nodes)
	{
		delete[] _nodes;
		_nodes = nullptr;
	}
}
void hashSearch::clear()
{
	memset(_first, 0xff, sizeof(uint32_t) * _hashSize);
	memset(_next, 0xff, sizeof(uint32_t) * _maxNodes);
	_nodeCount = 0;
}

void* hashSearch::findNode(uint32_t key, void* p)
{
	if (!_first || !_nodes || !_next) return nullptr;
	uint32_t bucket = hash(key)&(_hashSize - 1);
	uint32_t i = _first[bucket];
	while (i != HASH_INVALID_FLAG)
	{
		if (_isEquale(p, _nodes[i]))
		{
			return  _nodes[i];
		 }
		i = _next[i];
	}
	return nullptr;
}

void* hashSearch::pushNode(uint32_t key, void* p)
{
	if (_nodeCount >= _maxNodes)
		return nullptr;
	uint32_t bucket = hash(key)&(_hashSize - 1);
	uint32_t i = _nodeCount;
	_nodeCount++;
	_nodes[i] = p;
	_next[i] = _first[bucket];
	_first[bucket] = i;
	return p;
}

hashSearch::hashSearch():
	_nodeCount(0),
	_maxNodes(0),
	_first(nullptr),
	_next(nullptr),
	_isEquale(nullptr),
	_nodes(nullptr),
	_hashSize(0)
{

}
void hashSearch::setMaxNodes(uint32_t maxNodes, uint32_t hashSize)
{
	if (!maxNodes) return;
	if (maxNodes > _maxNodes)
	{
		_maxNodes = maxNodes;
		if (_nodes)
		{
			delete[] _nodes;
			_nodes = nullptr;
		}
		_nodes = new (std::nothrow)void*[_maxNodes];
		assert(_nodes, "");

		if (!hashSize || hashSize > (_maxNodes >> 2))
		{
			_hashSize = convert_pow2(_maxNodes >> 2);
		}
		else
		{
			_hashSize = convert_pow2(hashSize);
		}
		
		if (_first)
		{
			delete[] _first;
			_first = nullptr;
		}
		_first = new (std::nothrow)uint32_t[_hashSize];

		if (_next)
		{
			delete[] _next;
			_next = nullptr;
		}
		_next = new (std::nothrow)uint32_t[_maxNodes];
		assert(_first, "");
		assert(_next, "");
		//memset(_first, 0xff, sizeof(uint32_t) * _hashSize);
		//memset(_next, 0xff, sizeof(uint32_t) * _maxNodes);
	}
	else
	{
		if (hashSize && _hashSize != convert_pow2(hashSize) && _hashSize < (_maxNodes >> 2))
		{
			_hashSize = convert_pow2(hashSize);
			if (_first)
			{
				delete[] _first;
				_first = nullptr;
			}
			_first = new (std::nothrow)uint32_t[_hashSize];
			assert(_first, "");
			//memset(_first, 0xff, sizeof(uint32_t) * _hashSize);
		}
	}
	clear();
}
void hashSearch::setCompareFunc(bool(*f)(const void*, const void*))
{
	_isEquale = f;
}

hashSearchMP::hashSearchMP()
{
	_nodes = new singleSizeMemoryPool(); 
	_maxNodes = 0;
	_hashSize = 0;
	_nodeCount = 0;
	_isEquale = nullptr;
	_pathNode = nullptr;
	_pathIndex = 0;
}

void hashSearchMP::setMaxNodes(uint32_t maxNodes, uint32_t hashSize)
{
	_maxNodes = maxNodes;
	if (DEFAULT_HASH_SEARCHMP_SIZE > hashSize)
		hashSize = DEFAULT_HASH_SEARCHMP_SIZE;
	if (!hashSize || hashSize > (_maxNodes >> 2))
	{
		_hashSize = convert_pow2(_maxNodes >> 2);
	}
	else
	{
		_hashSize = convert_pow2(hashSize);
	}
	if (_hashSize == 0)
		_hashSize = DEFAULT_HASH_SEARCHMP_SIZE;
	if (!_nodes)
		_nodes = new singleSizeMemoryPool();
	if (!_nodes->isInit())
	{
		_nodes->poolInit(sizeof(hashSearchMPNode), maxNodes * sizeof(hashSearchMPNode), maxNodes * sizeof(hashSearchMPNode), sizeof(void*));
	}
	
	clear();
}

void hashSearchMP::setCompareFunc(bool(*f)(const hashSearchMPNode*, const hashSearchMPNode*))
{
	_isEquale = f;
}

hashSearchMP::hashSearchMP(uint32_t maxNodes, bool(*f)(const hashSearchMPNode*, const hashSearchMPNode*))
{
	_nodes = new singleSizeMemoryPool();
	_maxNodes = 0;
	_hashSize = 0;
	_nodeCount = 0;
	_isEquale = nullptr;
	_pathNode = nullptr;
	_pathIndex = 0;
	_isEquale = nullptr;
	setMaxNodes(maxNodes);
	setCompareFunc(f);
}
hashSearchMP::hashSearchMP(uint32_t maxNodes, uint32_t hashSize, bool(*f)(const hashSearchMPNode*, const  hashSearchMPNode*))
{
	_nodes = new singleSizeMemoryPool();
	_maxNodes = 0;
	_hashSize = 0;
	_nodeCount = 0;
	_isEquale = nullptr;
	_pathNode = nullptr;
	_pathIndex = 0;
	_isEquale = nullptr;
	setMaxNodes(maxNodes,hashSize);
	setCompareFunc(f);
}
void hashSearchMP::clear()
{
	if (!_nodes->isInit()) return;
	_nodes->poolRestart();
	_nodeCount = 0;
	_pathNode = nullptr;
	_pathIndex = 0;
	for (int i = 0; i < _hashSize; ++i)
	{
		hashSearchMPNode*  node = (hashSearchMPNode*)_nodes->poolAlloc();
		node->reset();
	}

}
hashSearchMP::~hashSearchMP()
{
	delete _nodes;
}

void* hashSearchMP::removeNode(uint32_t key, void* p)
{
	uint32_t bucket = hash(key)&(_hashSize - 1);
	hashSearchMPNode* pBucket = (hashSearchMPNode*)_nodes->poolItemPoint(bucket);
	
	if (pBucket->value == nullptr)
		return nullptr;
	hashSearchMPNode* pParentBucket = nullptr;
	hashSearchMPNode insertNode;
	insertNode.value = p;
	while (pBucket)
	{
		if (_isEquale(&insertNode, pBucket))
		{
			if (pParentBucket == nullptr)
			{
				if (pBucket->next == nullptr)
				{
					pBucket->value = nullptr;
				}
				else
				{
					pBucket->value = pBucket->next->value;
					void *pDealloc = pBucket->next;
					pBucket->next = pBucket->next->next;
					_nodes->poolDealloc(pDealloc);
				}
				
				_nodeCount--;
				return p;
			}
			else
			{
				pParentBucket->next = pBucket->next;
				_nodes->poolDealloc(pBucket);
				_nodeCount--;
				return p;
			}
		}
		pParentBucket = pBucket;
		pBucket = pBucket->next;
	}
	return nullptr;
}

void* hashSearchMP::findNode(uint32_t key, void* p)
{
	uint32_t bucket = hash(key)&(_hashSize - 1);
	hashSearchMPNode* pBucket = (hashSearchMPNode*)_nodes->poolItemPoint(bucket);
	if (pBucket->value == nullptr)
		return nullptr;
	hashSearchMPNode insertNode;
	insertNode.value = p;
	while (pBucket)
	{
		if (_isEquale(&insertNode, pBucket))
			return pBucket->value;
		pBucket = pBucket->next;
	}
	return nullptr;
}
void* hashSearchMP::pushNode(uint32_t key, void* p)
{
	uint32_t bucket = hash(key)&(_hashSize - 1);
	hashSearchMPNode* pBucket = (hashSearchMPNode*)_nodes->poolItemPoint(bucket);
	hashSearchMPNode insertNode;
	insertNode.value = p;
	
	if (pBucket->value == nullptr)
	{
		pBucket->value = p;
		_nodeCount++;
		return p;
	}

	hashSearchMPNode* pParentBucket = nullptr;
	while (pBucket)
	{
		
		if (_isEquale(pBucket, &insertNode))
		{
			return nullptr;
		}
		pParentBucket = pBucket;
		pBucket = pBucket->next;
	}
	_nodeCount++;
	hashSearchMPNode *pInsertNode = (hashSearchMPNode*)_nodes->poolAlloc();
	pInsertNode->reset();
	pInsertNode->value = p;
	pParentBucket->next = pInsertNode;
	return p;
}

void  hashSearchMP::traversalinit()
{
	_pathIndex = 0;
	_pathNode = nullptr;
	_pathCount = _nodeCount;
}
hashSearchMPNode* hashSearchMP::traversal()
{
	if (_pathCount == 0) return nullptr;
	if (!_pathNode)
	{
		for (int i = _pathIndex; i < _hashSize; ++i)
		{
			_pathNode = (hashSearchMPNode*)_nodes->poolItemPoint(i);
			if (_pathNode->value != nullptr)
			{
				_pathIndex = i;
				break;
			}
		}
	}
	else
	{
		if (_pathNode->next == nullptr)
		{
			_pathIndex += 1;
			for (int i = _pathIndex; i < _hashSize; ++i)
			{
				_pathNode = (hashSearchMPNode*)_nodes->poolItemPoint(i);
				if (_pathNode->value != nullptr)
				{
					_pathIndex = i;
					break;
				}
			}
		}
		else
		{
			_pathNode = _pathNode->next;
		}
	}
	_pathCount--;
	return _pathNode;
}