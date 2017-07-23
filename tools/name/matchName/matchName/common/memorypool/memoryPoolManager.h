#ifndef MEMORY_POOL_MANAGER_H__
#define MEMORY_POOL_MANAGER_H__

#include "memoryPool.h"
#include <unordered_map>

typedef std::unordered_map<std::string, memoryPool*> V_memoryPool;

class memoryPoolManager
{
	public :
		static memoryPoolManager* getInstance();
		memoryPool* makeMemoryPool(const char* poolName, E_MEMORY_TYPE type);
		memoryPool* makeMemoryPool(const char* poolName, int itemByteSize, int itemPreCount, int initItemCount, int alignment);
		memoryPool* makeMemoryPool(const char* poolName, size_t memoryCount, int alignment);
		bool		initPool(const char* poolName, int itemByteSize, int itemPreCount, int initItemCount, int alignment);
		bool		initPool(const char* poolName, size_t memoryCount, int alignment);
		bool		removePool(const char* poolName);
		bool		removePool(memoryPool *mp);
		Void*		allocPool(const char* poolName);
		Void*		allocPool(memoryPool* pool);
		Void*		allocPool(const char* poolName, size_t size);
		Void*		allocPool(memoryPool* pool, size_t size);
		bool		deallocPool(const char* poolName, Void**);
		bool		deallocPool(memoryPool* pool, Void**);
		bool		deallocPool(const char* poolName, Void**, size_t size);
		bool		deallocPool(memoryPool* pool, Void**, size_t size);
		void		release();
		memoryPool* getMemory(const char* poolName);
	private :
		V_memoryPool	_memoryPool;
		static memoryPoolManager* _instance;
		memoryPoolManager();
		~memoryPoolManager();
};

#endif