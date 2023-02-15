pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm i --legacy-peer-deps'
        sh 'npm run build --verbose'
        googleStorageUpload(pattern: '/tmp/workspace/eact-frontend_feature_despliegue/build/', bucket: 'gs://clawtech-logistica-proyecto-jenkins-artifacts/react/$JOB_NAME/$BUILD_NUMBER', credentialsId: 'clawtech-logistica-proyecto')
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