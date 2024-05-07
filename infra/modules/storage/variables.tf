variable "resource_group_name" {
  description = "(Required) Specifies the resource group name"
  type        = string
}

variable "location" {
  description = "(Required) Specifies the location of the Azure OpenAI Service"
  type        = string
}

variable "name" {
  description = "(Required) Specifies the name of the Azure OpenAI Service"
  type        = string
}

variable "tags" {
  description = "(Optional) Specifies the tags of the Azure OpenAI Service"
  type        = map(any)
  default     = {}
}

variable "container_name" {
  description = "(Required) Specifies the name of the Azure OpenAI Service"
  type        = string
}
