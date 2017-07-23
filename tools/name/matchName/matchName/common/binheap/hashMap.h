#ifndef HASH_MAP_H__
#define HASH_MAP_H__

#include <stdint.h>

struct chashNode
{
	void* node;
	chashNode* next;
	chashNode()
	{
		node = nullptr;
		next = nullptr;
	}
};

class chashMap
{
	public :
		static uint32_t hash(uint32_t a)
		{
			/*a -= (a << 6);
			a ^= (a >> 17);
			a -= (a << 9);
			a ^= (a << 4);
			a -= (a << 3);
			a ^= (a << 10);
			a ^= (a >> 15);*/
			return a;
		}
		chashMap()
		{
			pBucket = nullptr;
			_capacity = 0;

		}
		chashMap(uint32_t capacity, bool(*isEquale)(const void*, const void*));
		void pushNode(uint32_t key, chashNode* node);
		chashNode* findNode(uint32_t key, chashNode* node);
		void writeFile();
		void writePHPFile();
	private :
		chashNode ** pBucket;
		uint32_t _capacity;
		bool(*_isEquale)(const void*, const void*);
		

};


#endif