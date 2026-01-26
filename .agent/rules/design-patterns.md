---
trigger: model_decision
description: Catalog of proven design patterns for common software design problems
---

# Design Patterns

Design patterns are typical solutions to common problems in software design. Each pattern is like a blueprint that you can customize to solve a particular design problem in your code.

## Benefits of Using Patterns

- **Proven solutions**: Time-tested approaches to recurring problems
- **Common language**: Shared vocabulary for efficient team communication
- **Reduced complexity**: Structured approach to solving complex problems
- **Easier maintenance**: Well-known patterns are easier to understand
- **Better architecture**: Promotes loose coupling and high cohesion

## Creational Patterns

These patterns provide various object creation mechanisms, which increase flexibility and reuse of existing code.

### Factory Method

Provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

**Use when**: Object creation logic is complex or needs to be centralized.

### Abstract Factory

Lets you produce families of related objects without specifying their concrete classes.

**Use when**: System needs to work with multiple families of related products.

### Builder

Lets you construct complex objects step by step. The pattern allows you to produce different types and representations using the same construction code.

**Use when**: Object construction has many optional parameters or complex initialization.

### Prototype

Lets you copy existing objects without making your code dependent on their classes.

**Use when**: Creating objects is expensive or complex and you need to clone existing instances.

### Singleton

Ensures a class has only one instance and provides a global access point to it.

**Use when**: Exactly one instance of a class is required (use sparingly, often considered anti-pattern).

## Structural Patterns

These patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.

### Adapter

Allows objects with incompatible interfaces to collaborate.

**Use when**: You need to use an existing class with an incompatible interface.

### Bridge

Lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently.

**Use when**: You want to avoid permanent binding between abstraction and implementation.

### Composite

Lets you compose objects into tree structures and then work with these structures as if they were individual objects.

**Use when**: You need to implement a tree-like object structure.

### Decorator

Lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

**Use when**: You need to add responsibilities to objects dynamically.

### Facade

Provides a simplified interface to a library, a framework, or any other complex set of classes.

**Use when**: You need a simple interface to a complex subsystem.

### Flyweight

Lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects.

**Use when**: You need to support large numbers of similar objects efficiently.

### Proxy

Lets you provide a substitute or placeholder for another object to control access to it.

**Use when**: You need lazy initialization, access control, logging, or caching.

## Behavioral Patterns

These patterns are concerned with algorithms and the assignment of responsibilities between objects.

### Chain of Responsibility

Lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler.

**Use when**: Multiple objects may handle a request, and the handler isn't known in advance.

### Command

Turns a request into a stand-alone object that contains all information about the request.

**Use when**: You need to parameterize objects with operations, queue operations, or implement undo.

### Iterator

Lets you traverse elements of a collection without exposing its underlying representation.

**Use when**: You need to access collection elements without exposing internal structure.

### Mediator

Lets you reduce chaotic dependencies between objects by restricting direct communications and forcing them to collaborate via a mediator object.

**Use when**: Objects communicate in complex but well-defined ways.

### Memento

Lets you save and restore the previous state of an object without revealing the details of its implementation.

**Use when**: You need to implement undo/redo functionality.

### Observer

Lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.

**Use when**: Changes to one object require changing others, and you don't know how many objects need to be changed.

### State

Lets an object alter its behavior when its internal state changes.

**Use when**: Object behavior depends on its state and must change at runtime.

### Strategy

Lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

**Use when**: You need to use different variants of an algorithm within an object.

### Template Method

Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps.

**Use when**: You have an algorithm with invariant parts and variable parts.

### Visitor

Lets you separate algorithms from the objects on which they operate.

**Use when**: You need to perform operations across a disparate set of objects.

## Pattern Selection Guidelines

1. **Understand the problem** before choosing a pattern
2. **Don't force patterns** where they don't fit
3. **Start simple** and refactor to patterns when needed
4. **Consider trade-offs** of each pattern
5. **Use patterns to communicate** design intent
6. **Combine patterns** when appropriate
7. **Know when NOT to use** a pattern