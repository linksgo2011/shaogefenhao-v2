---
title: System Design | 8 Key Knowledge Points about DDD
date: 2024-04-12 22:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 8 core knowledge points about DDD
      description: 8 core knowledge points about DDD
---

![diagram 2x.jpg](key-of-domain-driven-deisgn/diagram 2x.jpg)

## Domain-Driven Design

Domain-Driven Design (DDD) is a design approach originating from the book "Domain-Driven Design: Tackling Complexity in the Heart of Software" by Eric Evans. It advocates designing software by building domain models to drive the design, starting from business knowledge and creating models that both business and technical personnel can understand.

A unified language is one of the key concepts of Domain-Driven Design. One of the main challenges in domain modeling is that business and technical personnel use different concepts (terminologies) to describe their understanding of the software. If the same language can be used for communication, then the design of complex software becomes easier.

Domain models serve as bridges across business domains as problem spaces and software solution spaces.

## Use Models to Express Business Entities

Use models to express business concepts and knowledge, and guide the further design of databases, APIs, and other software components. Model thinking is one of the important ways of thinking in software engineering. It can simplify complex problems and make them easier to understand from a certain perspective.

Models are simplifications of the real world. For example, a map is an effective model that helps people understand roads and streets.

Domain models are simplified models of the business domain.

## Identify the Boundaries of the Model

Due to the relevance of business, loose boundaries may form between collections of domain models, providing opportunities to decompose complex, large-scale problems into local, messaging problems.

By discerning the relevance of models, finding boundaries can guide the partitioning of software modules (monolithic architecture) and the partitioning of services (microservices architecture).

In Domain-Driven Design, identified boundaries are referred to as bounded contexts.

## Identify the Aggregation

In the relational model of databases, models form a network structure. This poses challenges for code implementation because handling business consistency issues is difficult. For example, between orders, order items, and products, the relationship between orders and order items is closer and has the same business lifecycle. In the Domain-Driven Design philosophy, we use aggregates to represent a group of models' dependency relationships, with one model playing the role of aggregate root, and others called entities and value objects.

If an aggregate has only one entity, then the aggregate root is this entity.

## Distinguish between entities and value objects

In addition to aggregate roots and entities, some models look like one-time use, they do not have their own ID to indicate identity, but are more like part of an entity, expressing a collection of several fields.

For example, in an e-commerce system, a user's frequently used address is a typical entity, which has its own ID as identity. But when a user selects an address for an order, the address at this time is just several fields on the order, which we will treat as value objects.

## Manipulate Models

In Domain-Driven Design, in order to manipulate these models, some objects have been derived as "operators".

- Factory: An object that handles the creation process of domain models, but sometimes it is not necessary.
- Service: Used to handle some business logic. For example, calculating the total price for an order or validating some business rules.
- Repository: Responsible for persisting domain models to the database or rebuilding them from the database. Its purpose is to isolate the differences between domain models and technical implementations.

## Layering the architecture

In order to better organize the various objects in the project, we need to layer like computer networks to simplify the complexity of complex projects.

In Domain-Driven Design, a four-layer architecture is recommended:

- User Interface Layer: Handles the data structure of user access, such as RESTful APIs, or events.
- Application Layer: Handles the business operation logic of users, that is, use cases, which are related to the usage scenarios of users.
- Domain Layer: Handles general domain logic, that is, reusable or more professional business logic, such as order price calculation.
- Infrastructure Layer: Used to adapt to the infrastructure, such as connecting to the database, operating Redis, etc.

## Domain Modeling

In order to extract domain models from business knowledge, people have invented many methods. Event storming is a popular software modeling method.Guiding business personnel and technical personnel to collaboratively create domain models through workshops, using business events as clues, to explore possible domain models in the system.

In addition to event storms, color modeling is also a commonly used modeling method. It distinguishes the characteristics of different domain models through colors to clarify the responsibilities of the domain model. Color modeling has been very popular in many years past.