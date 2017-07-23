
#include <iostream>
#include <fstream>

#include "hashMap.h"

chashMap::chashMap(uint32_t capacity, bool(*isEquale)(const void*, const void*))
{
	_isEquale = isEquale;
	_capacity = capacity;
	pBucket = new chashNode*[capacity];
	
	memset(pBucket, 0, sizeof(chashNode*) * capacity);
}

chashNode* chashMap::findNode(uint32_t key, chashNode* node)
{
	if (node == nullptr) return nullptr;
	if (_isEquale == nullptr) return nullptr;
	uint32_t bucket = hash(key)%(_capacity);
	if (pBucket[bucket] == nullptr) return nullptr;
	chashNode* p = pBucket[bucket];
	while (p)
	{
		if (_isEquale(node, p))
		{
			return p;
		}
		else
		{
			p = p->next;
		}
	}
	return nullptr;
}

void chashMap::pushNode(uint32_t key, chashNode* node)
{
	if (node == nullptr) return;
	if (findNode(key, node)) return;
	uint32_t bucket = hash(key)%(_capacity);

	if (pBucket[bucket] == nullptr)
	{
		pBucket[bucket] = node;
	}
	else
	{
		chashNode* p = pBucket[bucket];
		while (p->next)
		{
			p = p->next;
		}
		p->next = node;
	}
}


void  intToByte(int i, char *bytes, int size = 4)
{
	//byte[] bytes = new byte[4];
	memset(bytes, 0, sizeof(char) *  size);
	bytes[0] = (char)(0xff & i);
	bytes[1] = (char)((0xff00 & i) >> 8);
	bytes[2] = (char)((0xff0000 & i) >> 16);
	bytes[3] = (char)((0xff000000 & i) >> 24);
	return;
}

void chashMap::writePHPFile()
{
	std::ofstream of;
	of.open("namesHashData.php", std::ios::out);
	if (!of.is_open())
	{
		std::cout << "error the" << "namesHashData.php" << " file is not exist!" << std::endl;
	}
	else
	{

		of.write("<?php", strlen("<?php"));
		of.write("\n", 1);
		of.write("$names = array \n ( \n", strlen("$names = array \n ( \n"));
		for (int i = 0; i < _capacity; ++i)
		{
			of.write("\tarray (", strlen("\tarray ("));
			chashNode* p = pBucket[i];
			while (p)
			{
				char* c = (char*)p->node;
				int len = strlen(c);
				of.write("\"", 1);
				of.write(c, len);
				
				p = p->next;
				if (p == nullptr)
				{
					of.write("\"", 1);
				}
				else
				{
					of.write("\",", 2);
				}
			}
			if (i == _capacity - 1)
				of.write(")\n", strlen(")\n"));
			else
				of.write("),\n", strlen("),\n"));
		}
		of.write(");\n", strlen(");\n"));
		of.write("?>", strlen("?>"));

		of.close();
	}
}

void chashMap::writeFile()
{
	std::ofstream of;
	of.open("debug name.txt", std::ios::out);
	if (!of.is_open())
	{
		std::cout << "error the" <<"debug name.txt" << " file is not exist!" << std::endl;
	}
	else
	{
		char index[20];
		for (int i = 0; i < _capacity; ++i)
		{
			sprintf(index, "%d", i);
			
			of.write(index, strlen(index));
			chashNode* p = pBucket[i];
			while (p)
			{
				char* c = (char*)p->node;
				int len = strlen(c);
				of.write(":", 1);
				of.write(c, len);
				p = p->next;
			}
			of.write("\n", 1);
		}
		of.close();
	}
}