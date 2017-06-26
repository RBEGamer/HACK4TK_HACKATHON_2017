import OpenOPC

#search for avaialble senors
opc.servers()
['Matrikon.OPC.Simulation.1', 'Kepware.KEPServerEX.V4']

#connecting to server
'opc = OpenOPC.open_client('localhost')
'opc.connect('ourServer')

#which items are available
opc.list()

#reading items
opc.read( ['Random.Int2', 'Random.Real4', 'Random.String'] )

#disconnect from the servers
opc.close
