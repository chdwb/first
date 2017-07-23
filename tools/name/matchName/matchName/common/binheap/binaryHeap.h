#ifndef BINARY_HEAP_H__
#define BINARY_HEAP_H__
#include <stdint.h>
#include "../MemoryPool/memoryPoolManager.h"


#define HASH_INVALID_FLAG	0xffffffff

class binaryHeap
{
public:
	binaryHeap();
	binaryHeap(uint32_t n, bool(*f)(const void*, const void*));
	void setHeapSise(uint32_t n);
	void setCompareFunc(bool(*f)(const void*, const void*));
	~binaryHeap();
	inline void clear()
	{
		_size = 0;
	}
	inline void* top()
	{
		return _heap[0];
	}
	inline void* pop()
	{
		if (_size == 0) return nullptr;
		void* result = _heap[0];
		_size--;
		_trickleDown(0, _heap[_size]);
		return result;
	}
	inline bool push(void* node)
	{
		if (!node) return false;
		if (_size >= _capacity) return false;
		_size++;
		_bubbleUp(_size - 1, node);
		return true;
	}
	inline void modify(void* node)
	{
		for (int i = 0; i < _size; ++i)
		{
			if (_heap[i] == node)
			{
				_bubbleUp(i, node);
				return;
			}
		}
		push(node);
	}
	inline bool empty()
	{
		return _size == 0;
	}
	inline uint32_t getCapacity() const
	{
		return _capacity;
	}
	;
private:
	bool(*_compareFunc)(const void*, const void*);
	void  _bubbleUp(int i, void* node);
	void _trickleDown(int i, void* node);
	uint32_t _capacity;
	uint32_t _size;
	void** _heap;
};



class hashSearch
{
	public:
		static uint32_t hash(uint32_t a)
		{
			a -= (a << 6);
			a ^= (a >> 17);
			a -= (a << 9);
			a ^= (a << 4);
			a -= (a << 3);
			a ^= (a << 10);
			a ^= (a >> 15);
			return a;
		}
		static uint32_t convert_pow2(uint32_t v)
		{
			v--;
			v |= v >> 1;
			v |= v >> 2;
			v |= v >> 4;
			v |= v >> 8;
			v |= v >> 16;
			v++;
			return v;
		}
		hashSearch();
		void setMaxNodes(uint32_t maxNodes, uint32_t hashSize = 0);
		void setCompareFunc(bool(*f)(const void*, const void*));
		hashSearch(uint32_t maxNodes, bool(*f)(const void*, const void*));
		hashSearch(uint32_t maxNodes, uint32_t hashSize, bool(*f)(const void*, const  void*));
		void clear();
		~hashSearch();
		void* findNode(uint32_t key, void*);
		void* pushNode(uint32_t key, void*);
	private:
		bool(*_isEquale)(const void*, const void*);
		void**	_nodes;
		uint32_t* _first;
		uint32_t* _next;
		uint32_t _maxNodes;
		uint32_t _hashSize;
		uint32_t _nodeCount;
};

#define HASE_SEARCHMP_NAME	"HASH_S_MP_"
#define DEFAULT_HASH_SEARCHMP_SIZE		64	

struct hashSearchMPNode
{
	void* value;
	hashSearchMPNode* next;
	hashSearchMPNode()
	{
		reset();
	}
	void reset()
	{
		value = next = nullptr;
	}
};

class hashSearchMP
{
public:
	static uint32_t hash(uint32_t a)
	{
		a -= (a << 6);
		a ^= (a >> 17);
		a -= (a << 9);
		a ^= (a << 4);
		a -= (a << 3);
		a ^= (a << 10);
		a ^= (a >> 15);
		return a;
	}
	static uint32_t convert_pow2(uint32_t v)
	{
		v--;
		v |= v >> 1;
		v |= v >> 2;
		v |= v >> 4;
		v |= v >> 8;
		v |= v >> 16;
		v++;
		return v;
	}
	
	hashSearchMP();
	void setMaxNodes(uint32_t maxNodes, uint32_t hashSize = 0);
	void setCompareFunc(bool(*f)(const hashSearchMPNode*, const hashSearchMPNode*));
	hashSearchMP(uint32_t maxNodes, bool(*f)(const hashSearchMPNode*, const hashSearchMPNode*));
	hashSearchMP(uint32_t maxNodes, uint32_t hashSize, bool(*f)(const hashSearchMPNode*, const  hashSearchMPNode*));
	void clear();
	~hashSearchMP();
	void* findNode(uint32_t key, void*);
	void* removeNode(uint32_t key, void*);
	void* pushNode(uint32_t key, void*);
	void  traversalinit();
	hashSearchMPNode* traversal();

private:
	
	bool(*_isEquale)(const hashSearchMPNode*, const hashSearchMPNode*);
	singleSizeMemoryPool* _nodes;
	uint32_t _maxNodes;
	uint32_t _hashSize;
	uint32_t _nodeCount;
	
	hashSearchMPNode* _pathNode;
	uint32_t		  _pathIndex;
	uint32_t		  _pathCount;
};




#endif