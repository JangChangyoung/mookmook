import admin from "firebase-admin";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.type,
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      private_key: process.env.private_key,
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.client_x509_cert_url,
    }),
  });
}

export default async (req, res) => {
  try {
    const { uid } = req.query;

    const query = await admin.auth().getUser(uid);
    const data = {
      displayName: query.displayName,
      photoURL: query.photoURL,
    };

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      success: false,
      error: "Permission Denied",
    });
  }
};
