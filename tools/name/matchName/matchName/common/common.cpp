#include "common.h"

#include <stdio.h>
#include <iostream>
#include <sstream>
#include <string>

namespace cy
{

	int getUtf8Length(char c)
	{
		int length = 0;
		int ch = c & 0x000000ff;
		for (int i = 0; i < 8; ++i)
		{
			if ((ch & 0x80) == 0x80)
			{
				length++;;
				ch <<= 1;
			}
			else
			{
				break;
			}
		}
		return length;
	}

	bool isNameEqualFunc(const void* a, const void* b)
	{
		const chashNode* ca = (const chashNode*)a;
		const chashNode* cb = (const chashNode*)b;
		return strcmp((char*)ca->node, (char*)cb->node) == 0;
	}

	chashMap*  parseUtfFile(const char* buffer, int length, char divch)
	{	
		chashMap *hash = new chashMap(512, isNameEqualFunc);
		bool isUtfHead = false;
		if (length < 3) isUtfHead = false;
		else
		{
			int head = 0;
			head |= ((buffer[0] << 16) & 0x00ff0000) + ((buffer[1] << 8) & 0x0000ff00) +(buffer[2] & 0x000000ff);
			if (head == UTF_8_DOM_HEAD)
				isUtfHead = true;
		}

		int index = 0;
		if (isUtfHead)index = 3;
		int key = 0;
		int startIndex = index;
		std::stringstream ss;

		for (index; index < length; ++index) 
		{
			if (divch == buffer[index])
			{
				std::string str;
				ss >> str;
				const char* name = str.c_str();
				int len = strlen(name);
				char* newName = new char[len + 1];
				strcpy(newName, name);
				newName[len] = '\0';
				chashNode * node = new chashNode();
				node->node = newName;
				node->next = nullptr;
				hash->pushNode(key, node);

				key = 0;
				ss.clear();
				continue;
			}	
			ss << buffer[index];
			int subKey = 0;
			int l = getUtf8Length(buffer[index]);
			if (l > 1)
			{
				subKey = (buffer[index] & 0x0000000f) << ((l - 1) * 6);
				
				for (int i = 1; i < l; ++i)
				{
					subKey += ((buffer[index + i] & 0x0000003F) << ((l - 1) - i) * 6);
					ss << buffer[index + i];
				}
				index += l - 1;
				//std::cout << std::hex << subKey << std::endl;
				key += subKey;
			}
			else
			{
				key += buffer[index];
				//std::cout << buffer[index] << std::endl;
			}
		}
		return hash;
	}

	char* loadFile(const char* name, unsigned int& len)
	{
		std::ifstream in;
		in.open(name, std::ios::in);
		if (!in.is_open())
		{
			std::cout << "error the" << name << " file is not exist!" << std::endl;
		}
		else
		{
			in.seekg(0, std::ios::end);
			len = in.tellg();
			char * buffer = new char[len];
			in.seekg(0, std::ios::beg);
			in.read(buffer, len);
			in.close();
			return buffer;
		}
		len = 0;
		return nullptr;
	}

	int	  getUtf_8Code(char* U, int len)
	{

		return 0;
	}
}