pipeline {
  agent any
  stages {
    stage('Checking dependencies') {
      steps {
        sh 'bash ./scripts/dependencies.sh'
      }
    }
    stage('Linting Projects') {
      steps {
        sh 'bash ./scripts/lint.sh'
      }
    }
    stage('Stopping old version') {
      when {
        anyOf {
          branch 'dev'
          branch 'ops'
        }
      }
      steps {
        sh 'bash ./scripts/stop.sh'
      }
    }
    stage('Deploying API') {
      when {
        anyOf {
          branch 'dev'
          branch 'ops'
        }
      }
      steps {
        sh 'bash ./scripts/deploy.sh'
      }
    }
  }
  environment {
    APP_PORTAL_HOST_V2 = 'https://letmeet.xyz'
  }
}