# Cloud Native

## Terminology

* Distributed Computing
  * Definition:
    * Distributed programming is the art of solving the same problem that you can solve on single computer using multiple computers.
  * Interestings:
    1. The performance advantage of high-end hardware is limited in tasks that require large amounts of communication between nodes.
    2. The performance gap between high-end and commodity hardware decreases with cluster size assuming a uniform memory access pattern across all nodes.
* Scalability
  * Definition:
    * The ability of a system, network, or process, to handle growing amount of work in a capable manner or its ability to be enlarged to accommodate that growth.
  * Interesting:
    1. Size scalabilty
       * Adding more nodes should make the system linearly faster; growing the dataset should not increase latency.
    2. Geographic scalability
       * It should be possible to use multiple data centers to reduce the time it takes to respond to user queries, while dealing with cross-data center latency in some sensible manner.
    3. Adminstrative scalibilty
       * Adding more nodes should not increase the adminstrative costs of the system.
* Performance \(and latency\)
  * Defintion:
    * Performance is characterized by the amount of useful work accomplshed by a computer system compared to the time and resources used.
  * Interestings:
    1. Depending on the context, this may involve achieving one or more of the following:
       * Short response time/low latency for a given piece of work.

