# AWS

## IAM

[https://aws.amazon.com/documentation/iam](https://aws.amazon.com/documentation/iam)

An IAM user doesn’t have to represent an actual person; you can create an IAM user in order to generate an access key for an application that runs in your corporate network and needs AWS access.

By default, users can’t access anything in your account. You grant permissions to a user by creating a policy, which is a document that defines the effect, actions, resources, and optional conditions.

**Example**

```text
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "dynamodb:*",
    "Resource": "arn:aws:dynamodb:us-west-2:123456789012:table/Books"
  }
}
```

When you attach the policy to a user, group, or role, then the IAM entity has those DynamoDB permissions.

You can organize IAM users into IAM groups and attach a policy to a group. If the user has not been granted an explicit permission for an action and a resource, the user does not have those permissions.

When you create a user-based policy like that, you specify the actions that are permitted and the resource \(EC2 instance, RDS database, etc.\) that the user is allowed to access. In some cases you can attach a policy to a resource in addition to attaching it to a user or group. For example, in Amazon S3, you can attach a policy to a bucket.

In a resource-based policy you specify what actions are permitted and what resource is affected \(just like a user-based policy\). However, you also explicitly list who is allowed access to the resource.

The following example shows an S3 bucket policy that allows an IAM user named bob in AWS account 777788889999 to put objects into the bucket called example-bucket.

**Example**

```text
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Principal": {"AWS": "arn:aws:iam::777788889999:user/bob"},
    "Action": [
      "s3:PutObject",
        "s3:PutObjectAcl"
    ],
    "Resource": "arn:aws:s3:::example-bucket/*"
  }
}
```

## CLI

[http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html\|Documentation](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html|Documentation)

Using an IAM Role to Grant Permissions to Applications Running on Amazon EC2 Instances

Applications that run on an EC2 instance must include AWS credentials in their AWS API requests. You could have your developers store AWS credentials directly within the EC2 instance and allow applications in that instance to use those credentials. But developers would then have to manage the credentials and ensure that they securely pass the credentials to each instance and update each EC2 instance when it’s time to rotate the credentials. That’s a lot of additional work.

Instead, you can and should use an IAM role to manage temporary credentials for applications that run on an EC2 instance. When you use a role, you don’t have to distribute long-term credentials to an EC2 instance. Instead, the role supplies temporary permissions that applications can use when they make calls to other AWS resources. When you launch an EC2 instance, you specify an IAM role to associate with the instance. Applications that run on the instance can then use the role-supplied temporary credentials to sign API requests.

## Lambda

#### Introduction

[http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html)

AWS Lambda is different from a traditional approach based on physical or virtual servers. You only need to give your logic, grouped in functions, and the service itself takes care of executing the functions, if and when required by managing the software stack used by the runtime you chose, the availability of the platform, and the scalability to sustain the throughput of the invocations.

Functions are executed in containers. Lambda functions are executed in physical servers but you don’t have to manage them, it’s common to define this kind of approach as **serverless**.

When you create a new function with Lambda, you choose a function name, create your code, and specify the configuration of the execution environment, which includes the following:

1. The maximum memory size
2. Timeout size
3. A role that describes what the function can do, and on which resources, using AWS Identity and Access Management.

Depending on the size of your memory, you will be give a certain ratio of CPU processing power. Such as choosing 256MB of memory allocates twice as much CPU power to your Lambda function than 128MB of memory.

With AWS Lambda you for:

* The number of invocations
* The hundreds of milliseconds of execution time of all invocations, depending on the memory given to the functions.

The execution time costs grows linearly with the memory: if you double the memory and keep the execution time the same, you double that part of the cost.

Each month there is no charge for:

* The first one million invocations
* The first 400,000 seconds \(111 hours, 4.6 days\) of execution time with 1gb of memory.

You can use Java and other languages running on top of the Java Virtual Machine \(JVM\) such as Clojure or Scala.

When you call a function with AWS Lambda, you provide an event and a context in the input:

* The **event** is a way to send input parameters to your function and is expressed using JSON syntax.
* The **context** is used to describe the execution environment and how the event is received and processed.

