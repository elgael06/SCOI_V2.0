Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Data.SqlClient
Imports System.Web.Script.Serialization

' Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class ServicioMatrices
    Inherits System.Web.Services.WebService

    'Public objConexion As New SqlConnection
    Public comando As New SqlCommand
    Public sentencia As String
    Public lectorDeDatos As SqlDataReader
    Public estadoDeConeccion As ConnectionState

    Dim nva_conexion As String = "Initial Catalog=SEGUIMIENTO_2;Data Source=localhost;Integrated Security=SSPI;"

    'Creamos el objeto conexion para enlazar con el servidor de datos
    Dim objConexion As New SqlConnection(nva_conexion)

    <WebMethod()>
    Public Sub ultimoIdMatriz()
        Try
            objConexion.Open()

            comando = New SqlCommand("SP_ultimoIdMatrizRealizada", objConexion)
            comando.CommandType = CommandType.StoredProcedure
            lectorDeDatos = comando.ExecuteReader
            Dim folio As String = ""
            If lectorDeDatos.HasRows Then

                While lectorDeDatos.Read
                    folio = lectorDeDatos.GetValue(0)
                End While

            End If
            objConexion.Close()
            Dim js As New JavaScriptSerializer()
            Context.Response.Write(js.Serialize(folio))

        Catch ex As Exception
            Dim js As New JavaScriptSerializer()
            Context.Response.Write(js.Serialize(1))
        End Try
    End Sub

    <WebMethod()>
    Public Sub ultimoFolio()
        Try
            objConexion.Open()
            'sentencia = "select Max(folio_matriz)+1 from matrices"
            comando = New SqlCommand("SP_ultimoFolio", objConexion)
            comando.CommandType = CommandType.StoredProcedure
            lectorDeDatos = comando.ExecuteReader
            Dim folio As String = ""
            If lectorDeDatos.HasRows Then

                While lectorDeDatos.Read
                    folio = lectorDeDatos.GetValue(0)
                End While

            End If

            Dim js As New JavaScriptSerializer()
            Context.Response.Write(js.Serialize(folio))

        Catch ex As Exception
            ' Throw ex
            Dim js As New JavaScriptSerializer()
            Context.Response.Write(js.Serialize(1))
        End Try
        objConexion.Close()
    End Sub
    <WebMethod()>
    Public Sub tablaAux() 'relevante
        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()
            comando = New SqlCommand("SP_matrizTablaAux", objConexion)
            comando.CommandType = CommandType.StoredProcedure
            lectorDeDatos = comando.ExecuteReader

            Dim lista As New Collection
            If lectorDeDatos.HasRows Then

                While lectorDeDatos.Read
                    Dim matriz As New Matriz()
                    matriz.FolioMatriz = lectorDeDatos.GetValue(0)
                    matriz.Establecimiento = lectorDeDatos.GetValue(1)
                    matriz.Descripcion = lectorDeDatos.GetValue(2)
                    lista.Add(matriz)
                End While

            End If

            Dim js As New JavaScriptSerializer()
            Context.Response.Write(js.Serialize(lista))

        Catch ex As Exception
            Throw ex
        End Try
        objConexion.Close()
    End Sub

    <WebMethod(EnableSession:=True)>
    Public Function tablaAuxEstablecimiento(ByVal dato As String)
        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()
            comando = New SqlCommand("SP_matrizEstablecimiento", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim parValorAEnviar As New SqlParameter
            parValorAEnviar.ParameterName = "@valor"
            parValorAEnviar.Value = dato
            comando.Parameters.Add(parValorAEnviar)

            lectorDeDatos = comando.ExecuteReader

            Dim lista As New Collection

            If lectorDeDatos.HasRows Then
                While lectorDeDatos.Read
                    Dim matriz As New TabAuxMatRea()
                    matriz.Folio = lectorDeDatos.GetValue(0)
                    matriz.Establecimiento = lectorDeDatos.GetValue(1)
                    matriz.Descripcion = lectorDeDatos.GetValue(2)
                    lista.Add(matriz)
                End While
            End If
            objConexion.Close()
            Dim js As New JavaScriptSerializer()
            ' Return js.Serialize(lista)
            Return lista

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    <WebMethod()>
    Public Sub matrizDisponibles()
        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()

            comando = New SqlCommand("SP_obtenerMatricesDisponibles", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            lectorDeDatos = comando.ExecuteReader

            Dim lista As New Collection
            If lectorDeDatos.HasRows Then

                While lectorDeDatos.Read
                    Dim matriz As New Matriz()
                    matriz.IdMatrizNueva = lectorDeDatos.GetValue(0)
                    matriz.FolioMatriz = lectorDeDatos.GetValue(1)
                    matriz.Establecimiento = lectorDeDatos.GetValue(2)
                    matriz.Aplicador = lectorDeDatos.GetValue(3)
                    matriz.Descripcion = lectorDeDatos.GetValue(4)
                    lista.Add(matriz)
                End While

            End If

            Dim js As New JavaScriptSerializer()
            Context.Response.Write(js.Serialize(lista))

        Catch ex As Exception
            Throw ex
        End Try
        objConexion.Close()
    End Sub

    <WebMethod(EnableSession:=True)>
    Public Function obtenerMatrizGuardada(valorAEnviar As String) As String
        Try
            'objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()

            comando = New SqlCommand("SP_obtenerMatrizEvaluada", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim parIdMatrizRealizada As New SqlParameter
            parIdMatrizRealizada.ParameterName = "@valor"
            parIdMatrizRealizada.Value = Convert.ToInt32(valorAEnviar)
            comando.Parameters.Add(parIdMatrizRealizada)

            lectorDeDatos = comando.ExecuteReader
            Dim lista As New Collection
            If lectorDeDatos.HasRows Then

                While lectorDeDatos.Read
                    Dim matriz As New Matriz()
                    matriz.IdMatrizNueva = lectorDeDatos.GetValue(0)
                    matriz.FolioMatriz = lectorDeDatos.GetValue(1)
                    matriz.Establecimiento = lectorDeDatos.GetValue(2)
                    matriz.Etapa = lectorDeDatos.GetValue(3)
                    matriz.Aspecto = lectorDeDatos.GetValue(4)
                    matriz.Unidad = lectorDeDatos.GetValue(5)
                    matriz.A1 = lectorDeDatos.GetValue(6)
                    matriz.A2 = lectorDeDatos.GetValue(7)
                    matriz.A3 = lectorDeDatos.GetValue(8)
                    matriz.A4 = lectorDeDatos.GetValue(9)
                    matriz.A5 = lectorDeDatos.GetValue(10)
                    matriz.A6 = lectorDeDatos.GetValue(11)
                    matriz.A7 = lectorDeDatos.GetValue(12)
                    matriz.A8 = lectorDeDatos.GetValue(13)
                    matriz.A9 = lectorDeDatos.GetValue(14)
                    matriz.A10 = lectorDeDatos.GetValue(15)
                    matriz.A11 = lectorDeDatos.GetValue(16)
                    matriz.A12 = lectorDeDatos.GetValue(17)
                    matriz.A13 = lectorDeDatos.GetValue(18)
                    matriz.A14 = lectorDeDatos.GetValue(19)
                    matriz.A15 = lectorDeDatos.GetValue(20)
                    matriz.A16 = lectorDeDatos.GetValue(21)
                    matriz.A17 = lectorDeDatos.GetValue(22)
                    matriz.A18 = lectorDeDatos.GetValue(23)
                    matriz.A19 = lectorDeDatos.GetValue(24)
                    matriz.A20 = lectorDeDatos.GetValue(25)
                    matriz.A21 = lectorDeDatos.GetValue(26)
                    matriz.A22 = lectorDeDatos.GetValue(27)
                    matriz.A23 = lectorDeDatos.GetValue(28)
                    matriz.A24 = lectorDeDatos.GetValue(29)
                    matriz.A25 = lectorDeDatos.GetValue(30)
                    matriz.A26 = lectorDeDatos.GetValue(31)
                    matriz.A27 = lectorDeDatos.GetValue(32)
                    matriz.A28 = lectorDeDatos.GetValue(33)
                    matriz.A29 = lectorDeDatos.GetValue(34)
                    matriz.A30 = lectorDeDatos.GetValue(35)
                    matriz.A31 = lectorDeDatos.GetValue(36)
                    matriz.A32 = lectorDeDatos.GetValue(37)
                    matriz.A33 = lectorDeDatos.GetValue(38)
                    matriz.A34 = lectorDeDatos.GetValue(39)
                    matriz.A35 = lectorDeDatos.GetValue(40)
                    matriz.A36 = lectorDeDatos.GetValue(41)
                    matriz.A37 = lectorDeDatos.GetValue(42)
                    matriz.A38 = lectorDeDatos.GetValue(43)
                    matriz.A39 = lectorDeDatos.GetValue(44)
                    matriz.A40 = lectorDeDatos.GetValue(45)
                    matriz.A41 = lectorDeDatos.GetValue(46)
                    matriz.A42 = lectorDeDatos.GetValue(47)
                    matriz.A43 = lectorDeDatos.GetValue(48)
                    matriz.A44 = lectorDeDatos.GetValue(49)
                    matriz.A45 = lectorDeDatos.GetValue(50)
                    matriz.A46 = lectorDeDatos.GetValue(51)
                    matriz.A47 = lectorDeDatos.GetValue(52)
                    matriz.A48 = lectorDeDatos.GetValue(53)
                    matriz.A49 = lectorDeDatos.GetValue(54)
                    matriz.A50 = lectorDeDatos.GetValue(55)
                    matriz.Porcentaje = lectorDeDatos.GetValue(56)
                    matriz.Ponderacion = lectorDeDatos.GetValue(57)
                    matriz.PuntosEnJuego = lectorDeDatos.GetValue(58)
                    matriz.PuntosObtenidos = lectorDeDatos.GetValue(59)
                    matriz.PorcentajeTotal = lectorDeDatos.GetValue(60)
                    matriz.PuntoJuegoTotal = lectorDeDatos.GetValue(61)
                    matriz.PuntosObtenidosTotal = lectorDeDatos.GetValue(62)
                    matriz.Promedio = lectorDeDatos.GetValue(63)
                    matriz.Aplicador = lectorDeDatos.GetValue(67)


                    lista.Add(matriz)
                End While

            End If
            Dim js As New JavaScriptSerializer()

            Return js.Serialize(lista)
        Catch ex As Exception
            Throw ex
        End Try
        objConexion.Close()
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function getMatriz(valorAEnviar As String) As String
        Try
            'objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()

            comando = New SqlCommand("SP_obtenerMatriz", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim parValorAEnviar As New SqlParameter
            parValorAEnviar.ParameterName = "@valor"
            parValorAEnviar.Value = Convert.ToInt32(valorAEnviar)
            comando.Parameters.Add(parValorAEnviar)

            lectorDeDatos = comando.ExecuteReader
            Dim lista As New Collection
            If lectorDeDatos.HasRows Then

                While lectorDeDatos.Read
                    Dim matriz As New MatrizCorta()
                    matriz.Orden = lectorDeDatos.GetValue(0)
                    matriz.Descripcion = lectorDeDatos.GetValue(1)
                    matriz.Etapa = lectorDeDatos.GetValue(2)
                    matriz.Unidad = lectorDeDatos.GetValue(3)
                    matriz.ElementoInsp = lectorDeDatos.GetValue(4)
                    matriz.Aspecto = lectorDeDatos.GetValue(5)
                    matriz.Establecimiento = lectorDeDatos.GetValue(6)
                    matriz.CantidadCelda = lectorDeDatos.GetValue(7)

                    lista.Add(matriz)
                End While

            End If
            Dim js As New JavaScriptSerializer()
            Dim dataOut = js.Serialize(lista)

            Return dataOut
        Catch ex As Exception
            Throw ex
        End Try
        objConexion.Close()
    End Function

    <WebMethod(EnableSession:=True)>
    Public Sub insertarData(datos As String)

        Dim js As New JavaScriptSerializer()

        Dim matriz As List(Of MatrizCorta) = js.Deserialize(Of List(Of MatrizCorta))(datos)

        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()

            For i = 0 To matriz.Count - 1
                comando = New SqlCommand("sp_matriz", objConexion)
                comando.CommandType = CommandType.StoredProcedure

                Dim parIdMatriz As New SqlParameter
                parIdMatriz.ParameterName = "@folio_matriz"
                parIdMatriz.Value = Convert.ToInt32(matriz(i).FolioMatriz)
                comando.Parameters.Add(parIdMatriz)

                Dim parOrden As New SqlParameter
                parOrden.ParameterName = "@orden"
                parOrden.Value = Convert.ToInt32(matriz(i).Orden)
                comando.Parameters.Add(parOrden)

                Dim parDescripcion As New SqlParameter
                parDescripcion.ParameterName = "@descripcion_matriz"
                parDescripcion.Value = matriz(i).Descripcion
                comando.Parameters.Add(parDescripcion)

                Dim parUnidad As New SqlParameter
                parUnidad.ParameterName = "@unidad"
                parUnidad.Value = matriz(i).Unidad
                comando.Parameters.Add(parUnidad)

                Dim parFolioEtapa As New SqlParameter
                parFolioEtapa.ParameterName = "@etapa"
                parFolioEtapa.Value = matriz(i).Etapa
                comando.Parameters.Add(parFolioEtapa)

                Dim parApecto As New SqlParameter
                parApecto.ParameterName = "@elemento_insp"
                parApecto.Value = matriz(i).ElementoInsp
                comando.Parameters.Add(parApecto)

                Dim parDepartamento As New SqlParameter
                parDepartamento.ParameterName = "@aspecto"
                parDepartamento.Value = matriz(i).Aspecto
                comando.Parameters.Add(parDepartamento)

                Dim parEstablecimiento As New SqlParameter
                parEstablecimiento.ParameterName = "@establecimiento"
                parEstablecimiento.Value = matriz(i).Establecimiento
                comando.Parameters.Add(parEstablecimiento)

                Dim parCantidadCeldas As New SqlParameter
                parCantidadCeldas.ParameterName = "@cantidad_celda"
                parCantidadCeldas.Value = matriz(i).CantidadCelda
                comando.Parameters.Add(parCantidadCeldas)

                comando.ExecuteNonQuery()
            Next i
        Catch ex As Exception
            Throw ex
        End Try

        objConexion.Close()

    End Sub
    <WebMethod(EnableSession:=True)>
    Public Sub eliminar(dato As String)
        Try
            'objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()
            'sentencia = "delete from matrizPruebas where folio_Matriz='" & dato & "'"
            comando = New SqlCommand("SP_eliminar", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim valorEliminar As New SqlParameter
            valorEliminar.ParameterName = "@valor"
            valorEliminar.Value = Convert.ToInt32(dato)

            comando.Parameters.Add(valorEliminar)

            comando.ExecuteNonQuery()

        Catch ex As Exception
            Throw ex
        End Try
        objConexion.Close()
    End Sub

    <WebMethod(EnableSession:=True)>
    Public Sub GuardarMatriz(datos As String, id As String)

        Dim js As New JavaScriptSerializer()

        Dim matriz As List(Of Matriz) = js.Deserialize(Of List(Of Matriz))(datos)

        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()

            For i = 0 To matriz.Count - 1
                comando = New SqlCommand("SP_guardarMatriz", objConexion)
                comando.CommandType = CommandType.StoredProcedure

                Dim parIdNuevoMatriz As New SqlParameter
                parIdNuevoMatriz.ParameterName = "@noMatriz"
                parIdNuevoMatriz.Value = Convert.ToInt32(id)
                comando.Parameters.Add(parIdNuevoMatriz)

                Dim parIdMatriz As New SqlParameter
                parIdMatriz.ParameterName = "@folio_matriz"
                parIdMatriz.Value = Convert.ToInt32(matriz(i).FolioMatriz)
                comando.Parameters.Add(parIdMatriz)

                Dim parEstablecimiento As New SqlParameter
                parEstablecimiento.ParameterName = "@establecimiento"
                parEstablecimiento.Value = matriz(i).Establecimiento
                comando.Parameters.Add(parEstablecimiento)

                Dim parEtapa As New SqlParameter
                parEtapa.ParameterName = "@etapa"
                parEtapa.Value = matriz(i).Etapa
                comando.Parameters.Add(parEtapa)

                Dim parAspecto As New SqlParameter
                parAspecto.ParameterName = "@aspecto"
                parAspecto.Value = matriz(i).Aspecto
                comando.Parameters.Add(parAspecto)

                Dim parUnidad As New SqlParameter
                parUnidad.ParameterName = "@unidad"
                parUnidad.Value = matriz(i).Unidad
                comando.Parameters.Add(parUnidad)

                Dim parA1 As New SqlParameter
                parA1.ParameterName = "@a1"
                parA1.Value = Convert.ToInt32(matriz(i).A1)
                comando.Parameters.Add(parA1)

                Dim parA2 As New SqlParameter
                parA2.ParameterName = "@a2"
                parA2.Value = Convert.ToInt32(matriz(i).A2)
                comando.Parameters.Add(parA2)

                Dim parA3 As New SqlParameter
                parA3.ParameterName = "@a3"
                parA3.Value = Convert.ToInt32(matriz(i).A3)
                comando.Parameters.Add(parA3)

                Dim parA4 As New SqlParameter
                parA4.ParameterName = "@a4"
                parA4.Value = Convert.ToInt32(matriz(i).A4)
                comando.Parameters.Add(parA4)

                Dim parA5 As New SqlParameter
                parA5.ParameterName = "@a5"
                parA5.Value = Convert.ToInt32(matriz(i).A5)
                comando.Parameters.Add(parA5)

                Dim parA6 As New SqlParameter
                parA6.ParameterName = "@a6"
                parA6.Value = Convert.ToInt32(matriz(i).A6)
                comando.Parameters.Add(parA6)

                Dim parA7 As New SqlParameter
                parA7.ParameterName = "@a7"
                parA7.Value = Convert.ToInt32(matriz(i).A7)
                comando.Parameters.Add(parA7)

                Dim parA8 As New SqlParameter
                parA8.ParameterName = "@a8"
                parA8.Value = Convert.ToInt32(matriz(i).A8)
                comando.Parameters.Add(parA8)

                Dim parA9 As New SqlParameter
                parA9.ParameterName = "@a9"
                parA9.Value = Convert.ToInt32(matriz(i).A9)
                comando.Parameters.Add(parA9)

                Dim parA10 As New SqlParameter
                parA10.ParameterName = "@a10"
                parA10.Value = Convert.ToInt32(matriz(i).A10)
                comando.Parameters.Add(parA10)

                Dim parA11 As New SqlParameter
                parA11.ParameterName = "@a11"
                parA11.Value = Convert.ToInt32(matriz(i).A11)
                comando.Parameters.Add(parA11)

                Dim parA12 As New SqlParameter
                parA12.ParameterName = "@a12"
                parA12.Value = Convert.ToInt32(matriz(i).A12)
                comando.Parameters.Add(parA12)

                Dim parA13 As New SqlParameter
                parA13.ParameterName = "@a13"
                parA13.Value = Convert.ToInt32(matriz(i).A13)
                comando.Parameters.Add(parA13)

                Dim parA14 As New SqlParameter
                parA14.ParameterName = "@a14"
                parA14.Value = Convert.ToInt32(matriz(i).A14)
                comando.Parameters.Add(parA14)

                Dim parA15 As New SqlParameter
                parA15.ParameterName = "@a15"
                parA15.Value = Convert.ToInt32(matriz(i).A15)
                comando.Parameters.Add(parA15)

                Dim parA16 As New SqlParameter
                parA16.ParameterName = "@a16"
                parA16.Value = Convert.ToInt32(matriz(i).A16)
                comando.Parameters.Add(parA16)

                Dim parA17 As New SqlParameter
                parA17.ParameterName = "@a17"
                parA17.Value = Convert.ToInt32(matriz(i).A17)
                comando.Parameters.Add(parA17)

                Dim parA18 As New SqlParameter
                parA18.ParameterName = "@a18"
                parA18.Value = Convert.ToInt32(matriz(i).A18)
                comando.Parameters.Add(parA18)

                Dim parA19 As New SqlParameter
                parA19.ParameterName = "@a19"
                parA19.Value = Convert.ToInt32(matriz(i).A19)
                comando.Parameters.Add(parA19)

                Dim parA20 As New SqlParameter
                parA20.ParameterName = "@a20"
                parA20.Value = Convert.ToInt32(matriz(i).A20)
                comando.Parameters.Add(parA20)

                Dim parA21 As New SqlParameter
                parA21.ParameterName = "@a21"
                parA21.Value = Convert.ToInt32(matriz(i).A21)
                comando.Parameters.Add(parA21)

                Dim parA22 As New SqlParameter
                parA22.ParameterName = "@a22"
                parA22.Value = Convert.ToInt32(matriz(i).A22)
                comando.Parameters.Add(parA22)

                Dim parA23 As New SqlParameter
                parA23.ParameterName = "@a23"
                parA23.Value = Convert.ToInt32(matriz(i).A23)
                comando.Parameters.Add(parA23)

                Dim parA24 As New SqlParameter
                parA24.ParameterName = "@a24"
                parA24.Value = Convert.ToInt32(matriz(i).A24)
                comando.Parameters.Add(parA24)

                Dim parA25 As New SqlParameter
                parA25.ParameterName = "@a25"
                parA25.Value = Convert.ToInt32(matriz(i).A25)
                comando.Parameters.Add(parA25)

                Dim parA26 As New SqlParameter
                parA26.ParameterName = "@a26"
                parA26.Value = Convert.ToInt32(matriz(i).A26)
                comando.Parameters.Add(parA26)

                Dim parA27 As New SqlParameter
                parA27.ParameterName = "@a27"
                parA27.Value = Convert.ToInt32(matriz(i).A27)
                comando.Parameters.Add(parA27)

                Dim parA28 As New SqlParameter
                parA28.ParameterName = "@a28"
                parA28.Value = Convert.ToInt32(matriz(i).A28)
                comando.Parameters.Add(parA28)

                Dim parA29 As New SqlParameter
                parA29.ParameterName = "@a29"
                parA29.Value = Convert.ToInt32(matriz(i).A29)
                comando.Parameters.Add(parA29)

                Dim parA30 As New SqlParameter
                parA30.ParameterName = "@a30"
                parA30.Value = Convert.ToInt32(matriz(i).A30)
                comando.Parameters.Add(parA30)

                Dim parA31 As New SqlParameter
                parA31.ParameterName = "@a31"
                parA31.Value = Convert.ToInt32(matriz(i).A31)
                comando.Parameters.Add(parA31)

                Dim parA32 As New SqlParameter
                parA32.ParameterName = "@a32"
                parA32.Value = Convert.ToInt32(matriz(i).A32)
                comando.Parameters.Add(parA32)

                Dim parA33 As New SqlParameter
                parA33.ParameterName = "@a33"
                parA33.Value = Convert.ToInt32(matriz(i).A33)
                comando.Parameters.Add(parA33)

                Dim parA34 As New SqlParameter
                parA34.ParameterName = "@a34"
                parA34.Value = Convert.ToInt32(matriz(i).A34)
                comando.Parameters.Add(parA34)

                Dim parA35 As New SqlParameter
                parA35.ParameterName = "@a35"
                parA35.Value = Convert.ToInt32(matriz(i).A35)
                comando.Parameters.Add(parA35)

                Dim parA36 As New SqlParameter
                parA36.ParameterName = "@a36"
                parA36.Value = Convert.ToInt32(matriz(i).A36)
                comando.Parameters.Add(parA36)

                Dim parA37 As New SqlParameter
                parA37.ParameterName = "@a37"
                parA37.Value = Convert.ToInt32(matriz(i).A37)
                comando.Parameters.Add(parA37)

                Dim parA38 As New SqlParameter
                parA38.ParameterName = "@a38"
                parA38.Value = Convert.ToInt32(matriz(i).A38)
                comando.Parameters.Add(parA38)

                Dim parA39 As New SqlParameter
                parA39.ParameterName = "@a39"
                parA39.Value = Convert.ToInt32(matriz(i).A39)
                comando.Parameters.Add(parA39)

                Dim parA40 As New SqlParameter
                parA40.ParameterName = "@a40"
                parA40.Value = Convert.ToInt32(matriz(i).A40)
                comando.Parameters.Add(parA40)

                Dim parA41 As New SqlParameter
                parA41.ParameterName = "@a41"
                parA41.Value = Convert.ToInt32(matriz(i).A41)
                comando.Parameters.Add(parA41)

                Dim parA42 As New SqlParameter
                parA42.ParameterName = "@a42"
                parA42.Value = Convert.ToInt32(matriz(i).A42)
                comando.Parameters.Add(parA42)

                Dim parA43 As New SqlParameter
                parA43.ParameterName = "@a43"
                parA43.Value = Convert.ToInt32(matriz(i).A43)
                comando.Parameters.Add(parA43)

                Dim parA44 As New SqlParameter
                parA44.ParameterName = "@a44"
                parA44.Value = Convert.ToInt32(matriz(i).A44)
                comando.Parameters.Add(parA44)

                Dim parA45 As New SqlParameter
                parA45.ParameterName = "@a45"
                parA45.Value = Convert.ToInt32(matriz(i).A45)
                comando.Parameters.Add(parA45)

                Dim parA46 As New SqlParameter
                parA46.ParameterName = "@a46"
                parA46.Value = Convert.ToInt32(matriz(i).A46)
                comando.Parameters.Add(parA46)

                Dim parA47 As New SqlParameter
                parA47.ParameterName = "@a47"
                parA47.Value = Convert.ToInt32(matriz(i).A47)
                comando.Parameters.Add(parA47)

                Dim parA48 As New SqlParameter
                parA48.ParameterName = "@a48"
                parA48.Value = Convert.ToInt32(matriz(i).A48)
                comando.Parameters.Add(parA48)

                Dim parA49 As New SqlParameter
                parA49.ParameterName = "@a49"
                parA49.Value = Convert.ToInt32(matriz(i).A49)
                comando.Parameters.Add(parA49)

                Dim parA50 As New SqlParameter
                parA50.ParameterName = "@a50"
                parA50.Value = Convert.ToInt32(matriz(i).A50)
                comando.Parameters.Add(parA50)

                Dim parPorcentaje As New SqlParameter
                parPorcentaje.ParameterName = "@porcentaje"
                'parPorcentaje.Value = Convert.ToDouble(matriz(i).Porcentaje)
                Dim porcentaje = Convert.ToDouble(matriz(i).Porcentaje)
                parPorcentaje.Value = porcentaje
                comando.Parameters.Add(parPorcentaje)

                Dim parPonderacion As New SqlParameter
                parPonderacion.ParameterName = "@ponderacion"
                parPonderacion.Value = Convert.ToInt32(matriz(i).Ponderacion)
                comando.Parameters.Add(parPonderacion)

                Dim parPuntoJuego As New SqlParameter
                parPuntoJuego.ParameterName = "@puntoJuego"
                parPuntoJuego.Value = Convert.ToInt32(matriz(i).PuntosEnJuego)
                comando.Parameters.Add(parPuntoJuego)

                Dim parPuntosObtenidos As New SqlParameter
                parPuntosObtenidos.ParameterName = "@puntosObtenidos"
                parPuntosObtenidos.Value = Convert.ToInt32(matriz(i).PuntosObtenidos)
                comando.Parameters.Add(parPuntosObtenidos)

                Dim parPorcentajeTotal As New SqlParameter
                parPorcentajeTotal.ParameterName = "@porcentajeTotal"
                'parPorcentajeTotal.Value = Convert.ToDouble(matriz(i).PorcentajeTotal)
                Dim porcentajeTotal = Convert.ToDouble(matriz(i).PorcentajeTotal)
                If porcentajeTotal > 100 Then
                    porcentajeTotal = porcentajeTotal / 10
                End If
                parPorcentajeTotal.Value = porcentajeTotal
                comando.Parameters.Add(parPorcentajeTotal)

                Dim parPuntoJuegoTotal As New SqlParameter
                parPuntoJuegoTotal.ParameterName = "@puntoJuegoTotal"
                parPuntoJuegoTotal.Value = Convert.ToInt32(matriz(i).PuntoJuegoTotal)
                comando.Parameters.Add(parPuntoJuegoTotal)

                Dim parPuntosObtenidosTotal As New SqlParameter
                parPuntosObtenidosTotal.ParameterName = "@PuntosObtenidosTotal"
                parPuntosObtenidosTotal.Value = Convert.ToInt32(matriz(i).PuntosObtenidosTotal)
                comando.Parameters.Add(parPuntosObtenidosTotal)

                Dim parPromedio As New SqlParameter
                parPromedio.ParameterName = "@promedio"
                'parPromedio.Value = Convert.ToDouble(matriz(i).Promedio)
                Dim promedio = Convert.ToDouble(matriz(i).Promedio)
                If promedio > 100 Then
                    promedio = promedio / 100
                End If
                parPromedio.Value = promedio
                comando.Parameters.Add(parPromedio)

                Dim parEstatus As New SqlParameter
                parEstatus.ParameterName = "@estatus"
                parEstatus.Value = "v" 'Convert.ToInt32(matriz(i).Promedio)
                comando.Parameters.Add(parEstatus)

                Dim parObservaciones As New SqlParameter
                parObservaciones.ParameterName = "@observaciones"
                parObservaciones.Value = matriz(i).Observaciones 'Convert.ToInt32(matriz(i).Promedio)
                comando.Parameters.Add(parObservaciones)

                Dim parAplicador As New SqlParameter
                parAplicador.ParameterName = "@aplicador"
                parAplicador.Value = matriz(i).Aplicador 'Convert.ToInt32(matriz(i).Promedio)
                comando.Parameters.Add(parAplicador)


                comando.ExecuteNonQuery()
            Next i
        Catch ex As Exception
            Throw ex
        End Try

        objConexion.Close()

    End Sub
    <WebMethod(EnableSession:=True)>'optimizado
    Public Sub SaveMatriz(id As Integer, folioMatriz As Integer, establecimiento As String, aplicador As String, etaAspUni As String, celdas() As Integer, estatus As String, guardar As Integer)
        Dim js As New JavaScriptSerializer()
        Dim etapasAspectoUnidad As List(Of EtapaAspectoUnidad) = js.Deserialize(Of List(Of EtapaAspectoUnidad))(etaAspUni)
        Dim contador = 0

        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()

            If guardar = 1 Then
                comando = New SqlCommand("sp_eliminarMatriz", objConexion)
                comando.CommandType = CommandType.StoredProcedure

                Dim parIdNuevoMatriz As New SqlParameter
                parIdNuevoMatriz.ParameterName = "@noMatriz"
                parIdNuevoMatriz.Value = id
                comando.Parameters.Add(parIdNuevoMatriz)

                comando.ExecuteNonQuery()
            End If

            For i = 0 To etapasAspectoUnidad.Count - 1
                comando = New SqlCommand("SP_saveMatriz", objConexion)
                comando.CommandType = CommandType.StoredProcedure

                Dim parIdNuevoMatriz As New SqlParameter
                parIdNuevoMatriz.ParameterName = "@noMatriz"
                parIdNuevoMatriz.Value = id
                comando.Parameters.Add(parIdNuevoMatriz)

                Dim parIdMatriz As New SqlParameter
                parIdMatriz.ParameterName = "@folio_matriz"
                parIdMatriz.Value = folioMatriz
                comando.Parameters.Add(parIdMatriz)

                Dim parEstablecimiento As New SqlParameter
                parEstablecimiento.ParameterName = "@establecimiento"
                parEstablecimiento.Value = establecimiento
                comando.Parameters.Add(parEstablecimiento)

                Dim parEtapa As New SqlParameter
                parEtapa.ParameterName = "@etapa"
                parEtapa.Value = etapasAspectoUnidad(i).Etapa
                comando.Parameters.Add(parEtapa)

                Dim parElemento As New SqlParameter
                parElemento.ParameterName = "@elemento_insp"
                parElemento.Value = etapasAspectoUnidad(i).ElementoInsp
                comando.Parameters.Add(parElemento)

                Dim parUnidad As New SqlParameter
                parUnidad.ParameterName = "@unidad"
                parUnidad.Value = etapasAspectoUnidad(i).Unidad
                comando.Parameters.Add(parUnidad)

                Dim parAplicador As New SqlParameter
                parAplicador.ParameterName = "@aplicador"
                parAplicador.Value = aplicador
                comando.Parameters.Add(parAplicador)

                Dim parAspecto As New SqlParameter
                parAspecto.ParameterName = "@aspecto"
                parAspecto.Value = etapasAspectoUnidad(i).Aspecto
                comando.Parameters.Add(parAspecto)

                For j = 0 To 49
                    Dim parCelda As New SqlParameter
                    parCelda.ParameterName = "@a" & (j + 1)
                    parCelda.Value = celdas(contador)
                    comando.Parameters.Add(parCelda)
                    contador += 1
                Next j

                Dim parEstatus As New SqlParameter
                parEstatus.ParameterName = "@estatus"
                parEstatus.Value = estatus
                comando.Parameters.Add(parEstatus)

                comando.ExecuteNonQuery()
            Next i
            objConexion.Close()
        Catch ex As Exception
            Throw ex
        End Try
    End Sub

    <WebMethod(EnableSession:=True)>'optimizado
    Public Sub InsertarObservaciones(noMatriz As Integer, datos As String, guardar As Integer)
        Dim js As New JavaScriptSerializer()
        Dim matrizObservacion As List(Of Observaciones) = js.Deserialize(Of List(Of Observaciones))(datos)


        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()

            If guardar = 1 Then
                comando = New SqlCommand("sp_eliminarObservacion", objConexion)
                comando.CommandType = CommandType.StoredProcedure

                Dim parNoMatriz As New SqlParameter
                parNoMatriz.ParameterName = "@noMatriz"
                parNoMatriz.Value = noMatriz
                comando.Parameters.Add(parNoMatriz)

                comando.ExecuteNonQuery()
            End If


            For i = 0 To matrizObservacion.Count - 1

                comando = New SqlCommand("SP_ingresarObservacion", objConexion)
                comando.CommandType = CommandType.StoredProcedure

                Dim parNoMatriz As New SqlParameter
                parNoMatriz.ParameterName = "@noMatriz"
                parNoMatriz.Value = noMatriz
                comando.Parameters.Add(parNoMatriz)

                Dim parFilaUnidad As New SqlParameter
                parFilaUnidad.ParameterName = "@fila_unidad"
                parFilaUnidad.Value = matrizObservacion(i).Fila
                comando.Parameters.Add(parFilaUnidad)

                Dim parColumna As New SqlParameter
                parColumna.ParameterName = "@columna"
                parColumna.Value = matrizObservacion(i).Columna
                comando.Parameters.Add(parColumna)

                Dim parNombreObservacion As New SqlParameter
                parNombreObservacion.ParameterName = "@nombre_observacion"
                parNombreObservacion.Value = matrizObservacion(i).Observacion
                comando.Parameters.Add(parNombreObservacion)

                Dim parColor As New SqlParameter
                parColor.ParameterName = "@color"
                parColor.Value = matrizObservacion(i).Color
                comando.Parameters.Add(parColor)

                comando.ExecuteNonQuery()
            Next i

        Catch ex As Exception
            Throw ex
        End Try
        objConexion.Close()
    End Sub

    <WebMethod(EnableSession:=True)>'optimizado
    Public Function obtenerDistintasEtapas(valor As String) As String
        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()
            comando = New SqlCommand("SP_obtenerDistintasEtapas", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim parFolioMatriz As New SqlParameter
            parFolioMatriz.ParameterName = "@folio_matriz"
            parFolioMatriz.Value = Convert.ToInt32(valor)
            comando.Parameters.Add(parFolioMatriz)

            Dim lista As New Collection
            lectorDeDatos = comando.ExecuteReader()
            If lectorDeDatos.HasRows Then
                While lectorDeDatos.Read
                    Dim etapa As New DistintasEtapas()
                    etapa.Etapa = lectorDeDatos.GetValue(0)
                    etapa.NombreEtapa = lectorDeDatos.GetValue(1)
                    lista.Add(etapa)
                End While
            End If

            objConexion.Close()
            Dim js As New JavaScriptSerializer()
            Return js.Serialize(lista)

        Catch ex As Exception
            Throw ex
        End Try

    End Function

    <WebMethod(EnableSession:=True)>'optimizado
    Public Function obtenerMatrizCorta(folio_matriz As Integer, folio_etapa As Integer) As String
        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()
            comando = New SqlCommand("SP_obtenerMatrizCorta", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim parFolioMatriz As New SqlParameter
            parFolioMatriz.ParameterName = "@folio_matriz"
            parFolioMatriz.Value = folio_matriz
            comando.Parameters.Add(parFolioMatriz)

            Dim parFolioEtapa As New SqlParameter
            parFolioEtapa.ParameterName = "@folio_etapa"
            parFolioEtapa.Value = folio_etapa
            comando.Parameters.Add(parFolioEtapa)

            Dim lista As New Collection
            lectorDeDatos = comando.ExecuteReader()
            If lectorDeDatos.HasRows Then
                While lectorDeDatos.Read
                    Dim matrizCorta As New MatrizMasCorta()
                    matrizCorta.Unidad = lectorDeDatos.GetValue(0)
                    matrizCorta.ElementoInspeccion = lectorDeDatos.GetValue(1)
                    matrizCorta.Aspecto = lectorDeDatos.GetValue(2)
                    matrizCorta.CantidadCelda = lectorDeDatos.GetValue(3)

                    lista.Add(matrizCorta)
                End While
            End If

            objConexion.Close()
            Dim js As New JavaScriptSerializer()
            Return js.Serialize(lista)

        Catch ex As Exception
            Throw ex
        End Try

        Return 0
    End Function

    <WebMethod(EnableSession:=True)>'optimizado
    Public Function getDistintasEtapas(valor As Integer) As String 'obtiene las distintas etapas de matriz realizada
        Try
            'objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()
            comando = New SqlCommand("SP_obtenerEtapas", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim parNoMatriz As New SqlParameter
            parNoMatriz.ParameterName = "@no_matriz"
            parNoMatriz.Value = Convert.ToInt32(valor)
            comando.Parameters.Add(parNoMatriz)

            Dim lista As New Collection
            lectorDeDatos = comando.ExecuteReader()
            If lectorDeDatos.HasRows Then
                While lectorDeDatos.Read
                    Dim etapa As New DistintasEtapas()
                    etapa.Etapa = lectorDeDatos.GetValue(0)
                    etapa.NombreEtapa = lectorDeDatos.GetValue(1)
                    lista.Add(etapa)
                End While
            End If

            objConexion.Close()
            Dim js As New JavaScriptSerializer()
            Return js.Serialize(lista)

        Catch ex As Exception
            objConexion.Close()
            Throw ex
        End Try
    End Function

    <WebMethod(EnableSession:=True)>
    Public Function getMatrizCorta(folio_matriz As Integer, folio_etapa As Integer) As String
        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()
            comando = New SqlCommand("SP_obtenerMatrizRealizada", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim parFolioMatriz As New SqlParameter
            parFolioMatriz.ParameterName = "@folio_matriz"
            parFolioMatriz.Value = folio_matriz
            comando.Parameters.Add(parFolioMatriz)

            Dim parFolioEtapa As New SqlParameter
            parFolioEtapa.ParameterName = "@folio_etapa"
            parFolioEtapa.Value = folio_etapa
            comando.Parameters.Add(parFolioEtapa)

            Dim lista As New Collection
            Dim celdas As New Collection
            lectorDeDatos = comando.ExecuteReader()
            If lectorDeDatos.HasRows Then
                While lectorDeDatos.Read

                    Dim matrizCorta As New Matriz_realizada()
                    matrizCorta.Elemento = lectorDeDatos.GetValue(0)
                    matrizCorta.Unidad = lectorDeDatos.GetValue(1)
                    matrizCorta.Aspecto = lectorDeDatos.GetValue(2)
                    For i = 3 To 52
                        matrizCorta.Celdas.Add(lectorDeDatos.GetValue(i))
                    Next

                    lista.Add(matrizCorta)

                End While
            End If

            objConexion.Close()
            Dim js As New JavaScriptSerializer()
            Return js.Serialize(lista)

        Catch ex As Exception
            Throw ex
        End Try

        Return 0
    End Function

    <WebMethod(EnableSession:=True)>'optimizado
    Public Function obtenerObservaciones(folio_matriz As Integer) As String 'retornamos el JSON
        Try
            ' objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString
            objConexion.Open()
            comando = New SqlCommand("SP_obtener_observaciones", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim parFolioMatriz As New SqlParameter
            parFolioMatriz.ParameterName = "@no_matriz"
            parFolioMatriz.Value = folio_matriz
            comando.Parameters.Add(parFolioMatriz)

            Dim lista As New Collection
            lectorDeDatos = comando.ExecuteReader()
            If lectorDeDatos.HasRows Then

                While lectorDeDatos.Read

                    Dim observacion As New Observaciones()
                    observacion.Fila = lectorDeDatos.GetValue(0)
                    observacion.Columna = lectorDeDatos.GetValue(1)
                    observacion.Observacion = lectorDeDatos.GetValue(2)
                    observacion.Color = lectorDeDatos.GetValue(3)

                    lista.Add(observacion)

                End While
            End If

            objConexion.Close()
            Dim js As New JavaScriptSerializer()
            Return js.Serialize(lista)

        Catch ex As Exception
            Throw ex
            objConexion.Close()
            Return Nothing
        End Try

        Return 0
    End Function
    <WebMethod(EnableSession:=True)>'optimizado
    Public Function obtenerCantidadCeldas(folio_matriz As Integer, folio_etapa As Integer) As String
        Try
            'objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString

            objConexion.Open()
            comando = New SqlCommand("SP_obtener_cantidad_celdas", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim parFolioMatriz As New SqlParameter
            parFolioMatriz.ParameterName = "@folio_matriz"
            parFolioMatriz.Value = folio_matriz
            comando.Parameters.Add(parFolioMatriz)

            Dim parFolioEtapa As New SqlParameter
            parFolioEtapa.ParameterName = "@folio_etapa"
            parFolioEtapa.Value = folio_etapa
            comando.Parameters.Add(parFolioEtapa)

            Dim lista As New Collection
            lectorDeDatos = comando.ExecuteReader()
            If lectorDeDatos.HasRows Then

                While lectorDeDatos.Read

                    Dim celda As New Celdas()
                    celda.Celda = lectorDeDatos.GetValue(0)
                    lista.Add(celda)

                End While
            End If

            objConexion.Close()
            Dim js As New JavaScriptSerializer()
            Return js.Serialize(lista)

        Catch ex As Exception
            Throw ex
            objConexion.Close()
            Return Nothing
        End Try

    End Function

    <WebMethod(EnableSession:=True)>
    Public Function vigentesMatriz(folio_matriz As Integer) As String
        Dim matriz As New MatrizVigente()
        Try
            '  objConexion.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("conexionRul").ConnectionString

            objConexion.Open()
            comando = New SqlCommand("SP_matriz_vigente", objConexion)
            comando.CommandType = CommandType.StoredProcedure

            Dim parFolioMatriz As New SqlParameter
            parFolioMatriz.ParameterName = "@folio_matriz"
            parFolioMatriz.Value = folio_matriz
            comando.Parameters.Add(parFolioMatriz)

            lectorDeDatos = comando.ExecuteReader()
            If lectorDeDatos.HasRows Then

                While lectorDeDatos.Read

                    matriz.HayVigente = 1
                    matriz.UltimaMatrizId = lectorDeDatos.GetValue(0)
                    'lista.Add(celda)

                End While
            End If

            objConexion.Close()
            Dim js As New JavaScriptSerializer()
            Return js.Serialize(matriz)

        Catch ex As Exception
            'Throw ex
            objConexion.Close()
            matriz.HayVigente = 0
            Return Nothing
        End Try

    End Function



End Class




Public Class Matriz

    Private _idMatrizNueva
    Public Property IdMatrizNueva As String
        Get
            Return _idMatrizNueva
        End Get
        Set(value As String)
            _idMatrizNueva = value
        End Set
    End Property

    Private _folioMatriz As String
    Public Property FolioMatriz As String
        Get
            Return _folioMatriz
        End Get
        Set(value As String)
            _folioMatriz = value
        End Set
    End Property

    Private _descripcion As String
    Public Property Descripcion As String
        Get
            Return _descripcion
        End Get
        Set(value As String)
            _descripcion = value
        End Set
    End Property

    Private _orden As String
    Public Property Orden As String
        Get
            Return _orden
        End Get

        Set(ByVal value As String)
            _orden = value
        End Set
    End Property

    Private _etapa As String
    Public Property Etapa As String
        Get
            Return _etapa
        End Get
        Set(ByVal value As String)
            _etapa = value
        End Set
    End Property

    Private _unidad As String
    Public Property Unidad As String
        Get
            Return _unidad
        End Get
        Set(value As String)
            _unidad = value
        End Set
    End Property

    Private _aspecto As String
    Public Property Aspecto As String
        Get
            Return _aspecto
        End Get
        Set(value As String)
            _aspecto = value
        End Set
    End Property

    Private _departamento As String
    Public Property Departamento As String
        Get
            Return _departamento
        End Get
        Set(value As String)
            _departamento = value
        End Set
    End Property

    Private _establecimiento As String
    Public Property Establecimiento As String
        Get
            Return _establecimiento
        End Get
        Set(value As String)
            _establecimiento = value
        End Set
    End Property

    Private _a1 As String
    Public Property A1 As String
        Get
            Return _a1
        End Get
        Set(value As String)
            _a1 = value
        End Set
    End Property

    Private _a2 As String
    Public Property A2 As String
        Get
            Return _a2
        End Get
        Set(value As String)
            _a2 = value
        End Set
    End Property

    Private _a3 As String
    Public Property A3 As String
        Get
            Return _a3
        End Get
        Set(value As String)
            _a3 = value
        End Set
    End Property

    Private _a4 As String
    Public Property A4 As String
        Get
            Return _a4
        End Get
        Set(value As String)
            _a4 = value
        End Set
    End Property

    Private _a5 As String
    Public Property A5 As String
        Get
            Return _a5
        End Get
        Set(value As String)
            _a5 = value
        End Set
    End Property

    Private _a6 As String
    Public Property A6 As String
        Get
            Return _a6
        End Get
        Set(value As String)
            _a6 = value
        End Set
    End Property

    Private _a7 As String
    Public Property A7 As String
        Get
            Return _a7
        End Get
        Set(value As String)
            _a7 = value
        End Set
    End Property

    Private _a8 As String
    Public Property A8 As String
        Get
            Return _a8
        End Get
        Set(value As String)
            _a8 = value
        End Set
    End Property

    Private _a9 As String
    Public Property A9 As String
        Get
            Return _a9
        End Get
        Set(value As String)
            _a9 = value
        End Set
    End Property

    Private _a10 As String
    Public Property A10 As String
        Get
            Return _a10
        End Get
        Set(value As String)
            _a10 = value
        End Set
    End Property

    Private _a11 As String
    Public Property A11 As String
        Get
            Return _a11
        End Get
        Set(value As String)
            _a11 = value
        End Set
    End Property

    Private _a12 As String
    Public Property A12 As String
        Get
            Return _a12
        End Get
        Set(value As String)
            _a12 = value
        End Set
    End Property

    Private _a13 As String
    Public Property A13 As String
        Get
            Return _a13
        End Get
        Set(value As String)
            _a13 = value
        End Set
    End Property

    Private _a14 As String
    Public Property A14 As String
        Get
            Return _a14
        End Get
        Set(value As String)
            _a14 = value
        End Set
    End Property

    Private _a15 As String
    Public Property A15 As String
        Get
            Return _a15
        End Get
        Set(value As String)
            _a15 = value
        End Set
    End Property

    Private _a16 As String
    Public Property A16 As String
        Get
            Return _a16
        End Get
        Set(value As String)
            _a16 = value
        End Set
    End Property

    Private _a17 As String
    Public Property A17 As String
        Get
            Return _a17
        End Get
        Set(value As String)
            _a17 = value
        End Set
    End Property

    Private _a18 As String
    Public Property A18 As String
        Get
            Return _a18
        End Get
        Set(value As String)
            _a18 = value
        End Set
    End Property

    Private _a19 As String
    Public Property A19 As String
        Get
            Return _a19
        End Get
        Set(value As String)
            _a19 = value
        End Set
    End Property

    Private _a20 As String
    Public Property A20 As String
        Get
            Return _a20
        End Get
        Set(value As String)
            _a20 = value
        End Set
    End Property

    Private _a21 As String
    Public Property A21 As String
        Get
            Return _a21
        End Get
        Set(value As String)
            _a21 = value
        End Set
    End Property

    Private _a22 As String
    Public Property A22 As String
        Get
            Return _a22
        End Get
        Set(value As String)
            _a22 = value
        End Set
    End Property

    Private _a23 As String
    Public Property A23 As String
        Get
            Return _a23
        End Get
        Set(value As String)
            _a23 = value
        End Set
    End Property

    Private _a24 As String
    Public Property A24 As String
        Get
            Return _a24
        End Get
        Set(value As String)
            _a24 = value
        End Set
    End Property

    Private _a25 As String
    Public Property A25 As String
        Get
            Return _a25
        End Get
        Set(value As String)
            _a25 = value
        End Set
    End Property

    Private _a26 As String
    Public Property A26 As String
        Get
            Return _a26
        End Get
        Set(value As String)
            _a26 = value
        End Set
    End Property

    Private _a27 As String
    Public Property A27 As String
        Get
            Return _a27
        End Get
        Set(value As String)
            _a27 = value
        End Set
    End Property

    Private _a28 As String
    Public Property A28 As String
        Get
            Return _a28
        End Get
        Set(value As String)
            _a28 = value
        End Set
    End Property

    Private _a29 As String
    Public Property A29 As String
        Get
            Return _a29
        End Get
        Set(value As String)
            _a29 = value
        End Set
    End Property

    Private _a30 As String
    Public Property A30 As String
        Get
            Return _a30
        End Get
        Set(value As String)
            _a30 = value
        End Set
    End Property

    Private _a31 As String
    Public Property A31 As String
        Get
            Return _a31
        End Get
        Set(value As String)
            _a31 = value
        End Set
    End Property

    Private _a32 As String
    Public Property A32 As String
        Get
            Return _a32
        End Get
        Set(value As String)
            _a32 = value
        End Set
    End Property

    Private _a33 As String
    Public Property A33 As String
        Get
            Return _a33
        End Get
        Set(value As String)
            _a33 = value
        End Set
    End Property

    Private _a34 As String
    Public Property A34 As String
        Get
            Return _a34
        End Get
        Set(value As String)
            _a34 = value
        End Set
    End Property

    Private _a35 As String
    Public Property A35 As String
        Get
            Return _a35
        End Get
        Set(value As String)
            _a35 = value
        End Set
    End Property

    Private _a36 As String
    Public Property A36 As String
        Get
            Return _a36
        End Get
        Set(value As String)
            _a36 = value
        End Set
    End Property

    Private _a37 As String
    Public Property A37 As String
        Get
            Return _a37
        End Get
        Set(value As String)
            _a37 = value
        End Set
    End Property

    Private _a38 As String
    Public Property A38 As String
        Get
            Return _a38
        End Get
        Set(value As String)
            _a38 = value
        End Set
    End Property

    Private _a39 As String
    Public Property A39 As String
        Get
            Return _a39
        End Get
        Set(value As String)
            _a39 = value
        End Set
    End Property

    Private _a40 As String
    Public Property A40 As String
        Get
            Return _a40
        End Get
        Set(value As String)
            _a40 = value
        End Set
    End Property

    Private _a41 As String
    Public Property A41 As String
        Get
            Return _a41
        End Get
        Set(value As String)
            _a41 = value
        End Set
    End Property

    Private _a42 As String
    Public Property A42 As String
        Get
            Return _a42
        End Get
        Set(value As String)
            _a42 = value
        End Set
    End Property

    Private _a43 As String
    Public Property A43 As String
        Get
            Return _a43
        End Get
        Set(value As String)
            _a43 = value
        End Set
    End Property

    Private _a44 As String
    Public Property A44 As String
        Get
            Return _a44
        End Get
        Set(value As String)
            _a44 = value
        End Set
    End Property

    Private _a45 As String
    Public Property A45 As String
        Get
            Return _a45
        End Get
        Set(value As String)
            _a45 = value
        End Set
    End Property

    Private _a46 As String
    Public Property A46 As String
        Get
            Return _a46
        End Get
        Set(value As String)
            _a46 = value
        End Set
    End Property

    Private _a47 As String
    Public Property A47 As String
        Get
            Return _a47
        End Get
        Set(value As String)
            _a47 = value
        End Set
    End Property

    Private _a48 As String
    Public Property A48 As String
        Get
            Return _a48
        End Get
        Set(value As String)
            _a48 = value
        End Set
    End Property

    Private _a49 As String
    Public Property A49 As String
        Get
            Return _a49
        End Get
        Set(value As String)
            _a49 = value
        End Set
    End Property

    Private _a50 As String
    Public Property A50 As String
        Get
            Return _a50
        End Get
        Set(value As String)
            _a50 = value
        End Set
    End Property

    Private _porcentaje As String

    Public Property Porcentaje As String
        Get
            Return _porcentaje
        End Get
        Set(value As String)
            _porcentaje = value
        End Set
    End Property

    Private _ponderacion As String

    Public Property Ponderacion As String
        Get
            Return _ponderacion
        End Get
        Set(value As String)
            _ponderacion = value
        End Set
    End Property

    Private _puntosJuego As String

    Public Property PuntosEnJuego As String
        Get
            Return _puntosJuego
        End Get
        Set(value As String)
            _puntosJuego = value
        End Set
    End Property

    Private _puntosObtenidos As String

    Public Property PuntosObtenidos As String
        Get
            Return _puntosObtenidos
        End Get
        Set(value As String)
            _puntosObtenidos = value
        End Set
    End Property

    Private _porcentajeTotal As String

    Public Property PorcentajeTotal As String
        Get
            Return _porcentajeTotal
        End Get
        Set(value As String)
            _porcentajeTotal = value
        End Set
    End Property

    Private _puntoJuegoTotal As String

    Public Property PuntoJuegoTotal As String
        Get
            Return _puntoJuegoTotal
        End Get
        Set(value As String)
            _puntoJuegoTotal = value
        End Set
    End Property

    Private _puntosObtenidosTotal As String

    Public Property PuntosObtenidosTotal As String
        Get
            Return _puntosObtenidosTotal
        End Get
        Set(value As String)
            _puntosObtenidosTotal = value
        End Set
    End Property

    Private _promedio As String

    Public Property Promedio As String
        Get
            Return _promedio
        End Get
        Set(value As String)
            _promedio = value
        End Set
    End Property

    Private _observaciones As String

    Public Property Observaciones As String
        Get
            Return _observaciones
        End Get
        Set(value As String)
            _observaciones = value
        End Set
    End Property

    Private _aplicador As String
    Public Property Aplicador As String
        Get
            Return _aplicador
        End Get
        Set(value As String)
            _aplicador = value
        End Set
    End Property

End Class