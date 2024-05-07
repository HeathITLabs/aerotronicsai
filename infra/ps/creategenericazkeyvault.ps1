
$RESOURCE_GROUP_NAME='rg-aerotronicsai'

New-AzResourceGroup -Name $RESOURCE_GROUP_NAME -Location "EastUS"

New-AzKeyVault -Name "kv-aerotronicsai" -ResourceGroupName $RESOURCE_GROUP_NAME -Location "EastUS"