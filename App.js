// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import appFirebase from './credenciales';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const consulta = await getDocs(collection(db, 'Usuarios'));
        const listaUsuarios = consulta.docs.map(doc => ({
          id: doc.id,
          nombre: doc.data().Nombre || 'Sin nombre',
          pasatiempo: doc.data().Pasatiempo || 'Sin pasatiempo'
        }));

        console.log("Usuarios cargados:", listaUsuarios); // Para depuración
        setUsuarios(listaUsuarios);
      } catch (error) {
        console.log("Error al obtener datos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuarios();
  }, []);

  if (cargando) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.cargando}>Cargando usuarios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>

      <View style={styles.tabla}>
        {/* Encabezado */}
        <View style={styles.filaEncabezado}>
          <Text style={[styles.textoEncabezado, styles.columnaNombre]}>Nombre</Text>
          <Text style={[styles.textoEncabezado, styles.columnaPasatiempo]}>Pasatiempo</Text>
        </View>

        {/* Filas de datos */}
        {usuarios.length === 0 ? (
          <View style={styles.fila}>
            <Text style={styles.sinDatos}>No hay usuarios registrados</Text>
          </View>
        ) : (
          usuarios.map((usuario, index) => (
            <View
              key={usuario.id}
              style={[
                styles.fila,
                index % 2 === 0 ? styles.filaPar : styles.filaImpar // Color alternado
              ]}
            >
              <Text style={styles.columnaNombre}>{usuario.nombre}</Text>
              <Text style={styles.columnaPasatiempo}>{usuario.pasatiempo}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#D0F0C0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E5C3A',
    marginBottom: 20,
  },

  tabla: {
    borderWidth: 2,
    borderColor: '#4A7C59',
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  filaEncabezado: {
    flexDirection: 'row',
    backgroundColor: '#4A7C59',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  textoEncabezado: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  fila: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },

  filaPar: {
    backgroundColor: '#FFFFFF',
  },

  filaImpar: {
    backgroundColor: '#F5F5F5',
  },

  columnaNombre: {
    width: '50%',
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  columnaPasatiempo: {
    width: '50%',
    fontSize: 15,
    textAlign: 'right',
    color: '#555',
    fontStyle: 'italic',
  },

  sinDatos: {
    width: '100%',
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    paddingVertical: 20,
  },

  cargando: {
    fontSize: 18,
    color: '#4A7C59',
    fontWeight: '600',
  },
});