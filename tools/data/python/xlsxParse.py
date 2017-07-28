#encoding:  utf-8
import os
import sys
import xlrd

class xlsxParse:
	def __init__(self):
		reload(sys) 
		sys.setdefaultencoding('utf8')  
		self.workbook = None
		pass
	def loadxlsxFile(self, inFile, outFile):
		self.out = outFile
		self.writeJSDATA()
		self.writePHPDATA()
		self.workbook = xlrd.open_workbook(inFile)
		for num in range(0,len(self.workbook.sheet_names())):
			sheet = self.workbook.sheet_by_index(num)
			self.parseSheet(sheet)
		
		self.closeFile()
	
	def writeJSDATA(self):
		self.jsFile = open(os.path.join(self.out , "JSDATA.js"), "w")
		self.jsFile.write("module.exports = {\n");
		
	def writePHPDATA(self):
		self.phpFile = open(os.path.join(self.out , "phpData.php"), "w")
		self.phpFile.write("<?php\nclass PhpData{\n");
		
	def closeFile(self):
		self.jsFile.write("\n};")
		self.jsFile.close()
		
		self.phpFile.write("}?>")
		self.phpFile.close()
	
	def processValue(self, value):
		if isinstance(value, float) :
			ivalue = int(value)
			if value - ivalue < 0.0000001:
				return str(ivalue).encode("utf-8")
			else:
				return str(value).encode("utf-8")
		if isinstance(value, int):
			return str(value).encode("utf-8")
		else: 
			return "\"" + str(value).encode("utf-8") + "\""
			
	def getDefaultValue(self, type):
		if type == 'float':
			return -1
		else:
			return "\"dummy\""
	
	def parseSheet(self, sheet):
		nrows = sheet.nrows;
		ncols = sheet.ncols
		tableKey = sheet.row_values(1)
		tableType = ["?" for x in range(ncols)]
		print "output .. " + sheet.name
		for t in range(2, nrows):
			table = sheet.row_values(t);
			for value in range(0,len(table)):
				if table[value] == "":
					continue
				else:
					tableType[value] = type(table[value])
					
		for t in tableType:
			if t == "?":
				print "error mission type";
		
		self.jsFile.write("\t"+sheet.name + ":{\n")
		self.phpFile.write("\tpublic $" + sheet.name + " = array\n\t(\n")
		for t in range(2, nrows):
			table = sheet.row_values(t);
			self.jsFile.write("\t\t")
			self.phpFile.write("\t\t")
			for value in range(0,len(table)):
				pvalue = self.processValue(table[value])
				if table[value] == "":
					pvalue = self.getDefaultValue(tableType[value])
				#print type(str(tableKey[value]).encode("utf-8"))
				if value ==0:
					self.jsFile.write("\""+str(tableKey[value]).encode("utf-8") + "_" +pvalue + "\":{\"" +str(tableKey[value]).encode("utf-8") + "\":"  +pvalue  + ", " )
					self.phpFile.write("\"" + str(tableKey[value]).encode("utf-8") + "_" +pvalue + "\"=>array(\"" +  str(tableKey[value]).encode("utf-8") + "\"=>"  +pvalue  + ", ")
				else:
					if value == len(table) - 1:
						self.jsFile.write("\"" +str(tableKey[value]).encode("utf-8") + "\":" +pvalue   )
						self.phpFile.write("\"" +str(tableKey[value]).encode("utf-8") + "\"=>" +pvalue  )
					else:
						self.jsFile.write("\"" +str(tableKey[value]).encode("utf-8") + "\":" +pvalue  + ", " )
						self.phpFile.write("\"" +str(tableKey[value]).encode("utf-8") + "\"=>" +pvalue  + ", " )
			if t == nrows - 1:
				self.jsFile.write("},\n")
				self.phpFile.write(")\n")
			else:
				self.jsFile.write("},\n")
				self.phpFile.write("),\n")
		self.jsFile	.write("\t\t\"TOTAL_COUNT\":"+str(nrows - 2)+"\n")
			
		self.jsFile.write("\t},\n")
		self.phpFile.write("\t);\n")
		pass
