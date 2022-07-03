pipeline {
  agent {
        node {
            label 'ubuntu-2004'
        }
    }
    
  stages {
    stage('Build') {
      steps {
        sh 'npm i --legacy-peer-deps'
        sh 'npm run build --verbose'
      }
    }
    stage('Deploy') {
      steps {
        sh 'gcloud app deploy'
      }
    }
  }
}
