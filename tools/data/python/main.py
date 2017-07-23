#encoding:  utf-8
import getopt
import sys
import xlsxParse

def main():
	opts,args = getopt.getopt(sys.argv[1:], "i:o:")
	inputValue = ""
	outputValue = ""
	for op, value in opts:
		if op == "-i":
			inputValue = value
		if op == "-o":
			outputValue = value
	
	xparse = xlsxParse.xlsxParse()
	xparse.loadxlsxFile(inputValue, outputValue)
	pass
	
if __name__ == "__main__":
    main()


