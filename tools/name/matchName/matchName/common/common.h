#ifndef COMMON_H____
#define COMMON_H____
#include <iostream>
#include <stdint.h>
#include<fstream>
#include "binheap/hashMap.h"
#define UTF_8_DOM_HEAD 0xEFBBBF


namespace cy {


	char* loadFile(const char* name, unsigned int& len);
	int	  getUtf_8Code(char* U, int len);
	chashMap*  parseUtfFile(const char* buffer, int length, char divch);

};


#endif