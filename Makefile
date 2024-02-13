build:
	docker-compose build
	npm install

start:
	docker-compose up -d
	npm run dev

stop:
	docker-compose down

logs:
	docker-compose logs

.PHONY: build start stop logs