const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuration de la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Remplacez par votre mot de passe
  database: 'cafe' // Nom de la base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

// Route pour vérifier les utilisateurs
app.post('/check-user', (req, res) => {
  const { userName, password } = req.body;

  const query = 'SELECT * FROM users WHERE userName = ? AND password = ?';
  db.query(query, [userName, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête:', err);
      res.status(500).send({ message: 'Erreur serveur' });
      return;
    }

    if (results.length > 0) {
      res.send({ exists: true });
    } else {
      res.send({ exists: false });
    }
  });
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
