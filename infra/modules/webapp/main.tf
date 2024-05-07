resource "azurerm_service_plan" "example" {
  name                = var.appserviceplan_name
  location            = var.location
  resource_group_name = var.resource_group_name
  sku_name            = "P1v2"
  os_type             = "Linux"
  tags                = var.tags
}

resource "azurerm_linux_web_app" "example" {
  name                = var.webapp_name
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.example.id
  tags                = var.tags

  site_config {
    application_stack {
      node_version = "20-lts"
    }
  }
}
