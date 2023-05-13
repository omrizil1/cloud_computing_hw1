# cloud_computing_hw1

In order to run the cloudFormation:

Go to the root folder (where the stack.json is located) and run the following command:

aws cloudformation create-stack --stack-name /<stack-name/> --template-body file://stack.json --parameters ParameterKey=myIP,ParameterValue="$(curl ipinfo.io/ip)"
  
  To find the pem file and get it locally after cloudFormation created the stack:
  
 aws ssm get-parameter --name /ec2/keypair/<key-id> --with-decryption --query Parameter.Value --output text > cloud-course-<stack-name>.pem
