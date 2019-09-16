import cdk = require("@aws-cdk/core");
import * as lambda from "@aws-cdk/aws-lambda";
import * as iot1click from "@aws-cdk/aws-iot1click";
import { Duration } from "@aws-cdk/core";

export class AppStack extends cdk.Stack {
  readonly lambda_root: string = "../lambda";

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const post_slack_lambda = new lambda.Function(this, "post_slack", {
      code: lambda.Code.asset(`${this.lambda_root}/slack_post.rb`),
      handler: "post_slack.handler",
      runtime: lambda.Runtime.RUBY_2_5,
      timeout: Duration.seconds(3),
      environment: {
        SLACK_HOOK_URL: process.env.SLACK_HOOK_URL || ""
      }
    });

    const iot_placement = new iot1click.CfnPlacement(this, "button_placement", {
      projectName: "button"
    });

    const iot_project = new iot1click.CfnProject(this, "iot_project", {
      placementTemplate: {
        deviceTemplates: {
          deviceType: iot1click.CfnProject.
        }
      }
    });
  }
}
