$RESOURCE_GROUP_NAME='tfstate'
$STORAGE_ACCOUNT_NAME="tfstateaerotronicsai"
$CONTAINER_NAME='tfstate'

New-AzResourceGroup -Name $RESOURCE_GROUP_NAME -Location eastus

$storageAccount = New-AzStorageAccount -ResourceGroupName $RESOURCE_GROUP_NAME -Name $STORAGE_ACCOUNT_NAME -SkuName Standard_LRS -Location eastus -AllowBlobPublicAccess $false

New-AzStorageContainer -Name $CONTAINER_NAME -Context $storageAccount.context


