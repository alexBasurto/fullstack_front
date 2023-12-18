import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
<>
<Header />
<main>
  <h2>Bienvenido a LagunPay</h2>

  <section>
    <p>Facilitamos la gestión de cuentas en grupo con LagunPay, la aplicación que simplifica y automatiza tus finanzas compartidas. Olvídate de los problemas al dividir gastos entre amigos, compañeros de casa o familiares. Con LagunPay, la tranquilidad financiera está a solo un clic de distancia.</p>
  </section>

  <section>
        <h2>Características destacadas</h2>
        <ul>
            <li><strong>División Equitativa:</strong> LagunPay calcula automáticamente las contribuciones de cada miembro, asegurando que todos paguen su parte justa.</li>
            <li><strong>Registro Sencillo:</strong> Registra tus gastos en segundos y mantén un historial claro y organizado de todas las transacciones del grupo.</li>
            <li><strong>Notificaciones Instantáneas:</strong> Mantente al tanto de las actualizaciones y pagos pendientes con notificaciones en tiempo real.</li>
        </ul>
  </section>
  <section>
    <h2>¿Cómo Funciona?</h2>
      <p>1. <strong>Regístrate:</strong> Crea tu cuenta LagunPay de forma rápida y segura.</p>
      <p>2. <strong>Crea un Grupo:</strong> Invita a tus amigos o compañeros de grupo para comenzar a compartir gastos.</p>
      <p>3. <strong>Registra Gastos:</strong> Ingresa tus gastos y LagunPay se encargará del resto.</p>
      <p>4. <strong>Equilibra tus Cuentas:</strong> LagunPay calculará las deudas y créditos, asegurando una distribución justa de los gastos.</p>
  </section>
    <section>
      <h2>¡Simplifica tus Finanzas Grupales con LagunPay!</h2>
      <p>Deja atrás los malentendidos y las complicaciones al compartir gastos. LagunPay está aquí para hacer que la gestión de cuentas en grupo sea fácil y eficiente. ¡Regístrate hoy y comienza a disfrutar de una nueva forma de manejar tus finanzas compartidas!</p>
      <a href="/register"><strong>¡Regístrate Ahora!</strong></a>
    </section>
</main>
<Footer/>
</>
  );
}

export default Home;