import React, { useState, useEffect, useCallback } from "react";
import { db } from "../database/firebase";
import Loader from "../components/Loader";

const AdminClients = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsfetching] = useState(false);

  useEffect(() => {
    setIsfetching(true);
    const clientsMessages = db.collection("Suscription").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(data);
      setIsfetching(false);
    });
    return () => clientsMessages();
  }, []);

  const handleCancelSubscription = useCallback(
    (userIndex, userId) => {
      const user = data[userIndex];
      const updatedUser = { ...user, payment: !user.payment };
      console.log(userId);
      db.collection("Suscription").doc(userId).set(updatedUser);
    },
    [data]
  );

  const handleDeleteClient = (id) => {
    db.collection("Suscription")
      .doc(id)
      .delete()
      .then(() => window.location.reload());
  };

  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : (
        <section class="section" id="contact-us">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 w-100 p-0">
                <div class="note"></div>
                <div class="contact-form fields">
                  <h4 class="text-center text-white mb-5">DATOS DE CLIENTES</h4>
                  <div className="section">
                    <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col" class="bg-warning">
                            Nombre
                          </th>
                          <th scope="col" class="bg-warning">
                            Email
                          </th>
                          <th scope="col" class="bg-warning">
                            Telefono
                          </th>
                          <th scope="col" class="bg-warning">
                            Pago N*
                          </th>
                          <th scope="col" class="bg-warning">
                            Fecha
                          </th>
                          <th scope="col" class="bg-warning">
                            Estado
                          </th>
                          <th scope="col" class="bg-warning">
                            Eliminar
                          </th>
                        </tr>
                      </thead>
                      <tbody className="admin">
                        {data.map(
                          (client, index) =>
                            client.email !== "admin@gmail.com" && (
                              <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.telephone}</td>
                                <td>{client.cuponNumber}</td>
                                <td>{client.paymentDate}</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      handleCancelSubscription(index, client.id)
                                    }
                                    style={{
                                      backgroundColor:
                                        client.payment === true
                                          ? "green"
                                          : "red",
                                      borderRadius: 5,
                                      margin: 2,
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      class="bi bi-currency-dollar"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                                    </svg>
                                  </button>
                                </td>
                                <td>
                                  <button
                                    onClick={() =>
                                      handleDeleteClient(client.id)
                                    }
                                    style={{
                                      backgroundColor: "red",
                                      borderRadius: 5,
                                      margin: 2,
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      class="bi bi-trash"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                      <path
                                        fill-rule="evenodd"
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminClients;
