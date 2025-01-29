## Creating new components

Components are divided into two categories: shared (dumb) components and feature (smart) components.

Shared/presenter/dumb components are responsible for rendering small bits and pieces of the UI. They do not have any knowledge of the outer business scope but are instead controlled by smart/feature components, with data being provided externally.

Smart components act as data organizers. They are responsible for data fetching, sharing state between child components, and organizing them into a complex feature.

The idea behind the Dumb/Smart component approach is to increase the reuse of functionality and subdivide the app into smaller, reusable parts.

Every component should make use of a component service for any kind of data manipulation to achieve a separation of concerns between pure UI presentation and UI data handling. This promotes the reuse of templates and enables component services to encapsulate logic that can be used across multiple components/features.

## Api communication

API communication is performed by services located in `shared/infrastructure`. These services are agnostic to application features and focus on basic data retrieval and schema validation without adding unnecessary processing overhead. Infrastructure services must not depend on any higher-level layers, such as dumb/smart components or business logic services.

## Shared business logic

Stateful services that provide state to multiple application features are located in the `shared/services` folder. These services may be utilized when navigating between app pages or across use case steps. Each service should follow the **Single Responsibility Principle** and cover only one business logic/domain area.

## Testing

This project follows the **testing pyramid model**: [Testing Pyramid by Martin Fowler](https://martinfowler.com/articles/practical-test-pyramid.html).

This approach is beneficial due to its heavy investment in unit test coverage, which results in tests that are quick, robust, and easy to maintain. E2E tests should cover complex use cases, but the ratio of unit tests should be significantly higher.

## Creating unit tests

Jest is used for unit test creation due to its virtual DOM, immense speed, and test parallelization. Jest provides over **10x speed improvement** compared to Karma: [Testing Angular Faster with Jest](https://www.xfive.co/blog/testing-angular-faster-jest/).

For rendering components, **Testing Library** is used to enable rapid prototyping and test environment manipulation: [Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro/).

Testing Library provides efficient APIs that speed up the testing process, especially for entities like directives, which otherwise require more setup/boilerplate when using the **TestBed API**.

## Creating E2E tests

Cypress is used for testing complex user flows in conjunction with the **Page Object Pattern**: [Page Objects in Angular E2E Testing](https://testing-angular.com/end-to-end-testing/#page-objects).

The Page Object Pattern enhances code reusability and maintainability since multiple tests can rely on a few page objects.

A **Page Object** consists of:

- A reference to a page or component.
- A set of **component harnesses** that define interactions with granular components.

A **Component Harness** describes the actions that can be performed when interacting with an Angular component.
