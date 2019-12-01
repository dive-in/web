dev_images:
	docker-compose -f docker-compose.dev.yml build

dev_start:
	docker-compose -f docker-compose.dev.yml up
