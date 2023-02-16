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
        emailext(subject: 'Jenkins Notificación IMPORTANTE', attachLog: true, body: 'Resultados de test:', to: 'guillermo.rodriguez@estudiantes.utec.edu.uy')
      }
    }

    stage('Deploy') {
      steps {
        sh 'gcloud app deploy'
      }
    }

  }
}