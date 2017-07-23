#include "common/common.h"


#define RES_NAME	"name.txt"
#include <stdint.h>

int main()
{
	unsigned int size = 0;
	char* buffer = cy::loadFile(RES_NAME,size);
	chashMap* hash=	cy::parseUtfFile(buffer, size, ',');
	hash->writePHPFile();
	std::cout << (buffer[0] == (char)0xEF ? "true" : "false")<< std::endl;
	if (buffer[0] == 0xEF && buffer[1] == 0xBB && buffer[2] == 0xBF)
		std::cout << "UTF HEAD" << std::endl;
	char cc = 44;
	std::cout << cc << std::endl;
	int aa = 0;
	aa |= buffer[0];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[1];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[2];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[3];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[4];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[5];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[6];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[7];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[8];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[9];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[10];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[11];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[12];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[13];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[14];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[15];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;
	aa = 0;
	aa |= buffer[16];
	aa &= 0x000000ff;
	std::cout << aa << std::endl;

	return 0;
}