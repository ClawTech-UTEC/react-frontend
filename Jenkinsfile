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
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      steps {
        sh 'sudo rm -rf /var/www/react-frontend/'
        sh "sudo cp -r ${WORKSPACE}/build/ /var/www/react-frontend/"
      }
    }
  }
}
