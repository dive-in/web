CONTAINER_NAME=api

bootstrap:
	docker exec -it ${CONTAINER_NAME} yarn
	
migrate:
	docker exec -it ${CONTAINER_NAME} yarn migrate

empty_migration:
	docker exec -it ${CONTAINER_NAME} yarn migrate:empty

generate_migrations:
	docker exec -it ${CONTAINER_NAME} yarn migrate:generate
