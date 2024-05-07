resource "azurerm_resource_group" "rg" {
  location = var.resource_group_location
  name     = "aerotronicsai"
}

# backend configuration is overriten in CICD pipeline, replaced by Azure Storage Account
terraform {
  backend "azurerm" {}
}

data "azurerm_client_config" "current" {
}

resource "random_string" "prefix" {
  length  = 6
  special = false
  upper   = false
  numeric = false
}

module "log_analytics_workspace" {
  source              = "./modules/log_analytics"
  name                = var.name_prefix == null ? "${random_string.prefix.result}${var.log_analytics_workspace_name}" : "${var.name_prefix}${var.log_analytics_workspace_name}"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  solution_plan_map   = var.solution_plan_map
  tags                = var.tags
}

module "openai" {
  source                        = "./modules/openai"
  name                          = var.name_prefix == null ? "${random_string.prefix.result}${var.openai_name}" : "${var.name_prefix}${var.openai_name}"
  location                      = var.location
  resource_group_name           = azurerm_resource_group.rg.name
  sku_name                      = var.openai_sku_name
  tags                          = var.tags
  deployments                   = var.openai_deployments
  custom_subdomain_name         = var.openai_custom_subdomain_name == "" || var.openai_custom_subdomain_name == null ? var.name_prefix == null ? lower("${random_string.prefix.result}${var.openai_name}") : lower("${var.name_prefix}${var.openai_name}") : lower(var.openai_custom_subdomain_name)
  public_network_access_enabled = var.openai_public_network_access_enabled
  log_analytics_workspace_id    = module.log_analytics_workspace.id
  log_analytics_retention_days  = var.log_analytics_retention_days
}

module "workload_managed_identity" {
  source              = "./modules/managed_identity"
  name                = var.name_prefix == null ? "${random_string.prefix.result}${var.workload_managed_identity_name}" : "${var.name_prefix}${var.workload_managed_identity_name}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  openai_id           = module.openai.id
  tags                = var.tags
}


module "storage" {
  source              = "./modules/storage"
  name                = var.storage_account_name_for_ai
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  tags                = var.tags
  container_name      = var.storage_container_name_for_ai
}

module "webapp" {
  source              = "./modules/webapp"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  tags                = var.tags
  appserviceplan_name = var.appserviceplan_name
  webapp_name         = var.webapp_name
}
