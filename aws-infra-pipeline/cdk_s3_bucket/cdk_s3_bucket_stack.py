from aws_cdk import (
    Stack,
    RemovalPolicy,
    aws_s3 as s3,  # Add the missing imports
)
from constructs import Construct

class CdkS3BucketStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create an S3 bucket
        bucket = s3.Bucket(self, "demo-cdk-code-catalyst-abhishek",  # Changed from XXXXXXXXXXXXX to a meaningful ID
            # Optional configurations
            bucket_name="testing-test-doc-bukall",  # Changed from XXXXXXXXXXXXX to a meaningful name
            versioned=True,  # Enable versioning
            encryption=s3.BucketEncryption.S3_MANAGED,  # Enable encryption
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,  # Block public access
            removal_policy=RemovalPolicy.DESTROY  # Optional: automatically delete bucket when stack is destroyed
        )
