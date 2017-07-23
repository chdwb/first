#ifndef MEMORY_POOL_H__
#define MEMORY_POOL_H__

#define Void	void
#define MUL_ITEM_MEMORY_POOL
//#define DEBUG_CHECK_MEMORY

#define MEMORY_POOL_RANDOM_ALLOC	1

enum E_MEMORY_TYPE { E_MEMORY_NONE, E_MEMORY_SINGLE_SIZE, E_MEMORY_MUL_SIZE };

class memoryPool
{
#ifdef DEBUG_CHECK_MEMORY
public:
#else
protected:
#endif
	Void	**_pFirstBlock;
	Void	**_pNowBlock;
	Void	**_pPathBlock;
	Void	*_pPathItem;
	size_t	_alignBytes;
	int		_itemsPerBlock;
	Void	*_pNextItem;
	Void	*_deaditemstack;
	long	_maxItems;
	bool	_isInit;
	size_t	_memorySize;
	E_MEMORY_TYPE	_type;
	Void* _triMalloc(unsigned int size);
	void _triFree(Void* p);
	Void** _getBlock(void*);
public:
	virtual E_MEMORY_TYPE getType() const;
	virtual long getMaxItems() const;
	virtual size_t		getAlignBytes()const;
	virtual bool	isInit() const;
	memoryPool();
	virtual ~memoryPool();
	virtual size_t getMemorySize();
	virtual int checkMemory(void*);
	void* poolBlockFirstPoint(int block = 0);
	int poolBlockCount();
	void* poolNextItem();
	int poolBlockSize(int block = 0);
};


class singleSizeMemoryPool : public memoryPool
{
protected:
	int		_itemsFirstBlock;
	int		_itemBytes;
	int		_unallocatedItems;
	long	_items;
	int		_pathItemsLeft;

public:
	long getItems() const;
	singleSizeMemoryPool();
	virtual ~singleSizeMemoryPool();
	bool poolInit(int byteCount, int itemCount, int firstItemCount, int alignment);
	void* poolItemPoint(int item);
	int poolItemIndex(void*);
	void* poolAlloc();
	void poolDealloc(void*);
	void poolDealloc(void*, size_t item);
	int poolItemSize();
	void	poolRestart();
	bool	traversalinit(void*);
	void*	traverse();

};

class mulSizeMemoryPool : public memoryPool
{
#ifdef DEBUG_CHECK_MEMORY
public:
#else
protected:
#endif
	Void	*_singleItemStore;
public:
	long getItems() const;
	mulSizeMemoryPool();
	virtual ~mulSizeMemoryPool();
	bool poolInit(size_t memoryCount, int alignment);
	void* poolAlloc(size_t size);
	void  poolDealloc(void*, size_t size);
	void	poolRestart();
};

#endif