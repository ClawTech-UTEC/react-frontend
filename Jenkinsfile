pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm i --legacy-peer-deps'
        sh 'npm run build --verbose'
      }
    }

    stage('test') {
      steps {
        sh 'npm test'
        emailext(subject: 'Jenkins Notificación IMPORTANTE', attachLog: true, body: 'Resultados de test:', to: 'tomas.fernandez@estudiantes.utec.edu.uy')
      }
    }

    stage('Deploy') {
      steps {
        sh 'gcloud auth activate-service-account jenkins-gce@ilog-377823.iam.gserviceaccount.com --key-file=key.json --project=ilog-377823'
        sh 'gcloud config set account jenkins-gce@ilog-377823.iam.gserviceaccount.com'
        sh 'gcloud app deploy'
      }
    }

  }
}