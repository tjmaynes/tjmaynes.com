# Databases



| Purpose-Built For | Optimized for When you need to | Example Workload |
| :--- | :--- | :--- |
| Row Store | Operate on a record or group of records | Payroll |
| Column Store | Aggregations, scans and joins | Analytics |
| Key-Value Store | Query by Key with high throughput and fast aggregation | Tracking Devices |
| Document Store | Index and Store documents for query on any property | Patient Data |
| Graph Store | Persist and retrieve relationships | Recommendations |
| Time-Series Store | Store and process data sequence | Monitoring |
| Unstructured Store | Get and Put of Objects | Store user reviews |

### Articles

#### Avoiding ORMS

[https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/](https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/)

* The syntax for one ORM is going to be different to another ORM in the same or different runtime.
  * Design patterns have long-term benefits over specific implementations.
  * Very complicated to debug.
* ORMs will do extra work than necessary due to the abstraction being too general.
* ORMs will not be able to do complex queries
  * Too general purpose
* Query Builders are a nice sweet spot.

