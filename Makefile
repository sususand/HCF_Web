# Makefile for Dockerizing ReactJS Web Page

# Variables
IMAGE_NAME := hcf_delivery_frontend
CONTAINER_NAME := hcf-delivery-container

.PHONY: build run stop clean

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run -d -p 3000:3000 --name $(CONTAINER_NAME) $(IMAGE_NAME)

stop:
	docker stop $(CONTAINER_NAME)
	docker rm $(CONTAINER_NAME)

clean:
	docker rmi $(IMAGE_NAME)
