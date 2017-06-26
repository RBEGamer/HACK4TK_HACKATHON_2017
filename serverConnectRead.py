import OpenOPC

string itemList

#search for avaialble senors
opc.servers()
['Matrikon.OPC.Simulation.1', 'Kepware.KEPServerEX.V4']

#connecting to server
'opc = OpenOPC.open_client('localhost')
'opc.connect('ourServer')

#which items are available
opc.list('itemList')

#reading items
opc.read( ['itemList'] )

#disconnect from the servers
opc.close
