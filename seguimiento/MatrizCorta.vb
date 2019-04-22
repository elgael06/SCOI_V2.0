Public Class MatrizCorta
    Private _folioMatriz As String
    Public Property FolioMatriz As String
        Get
            Return _folioMatriz
        End Get
        Set(value As String)
            _folioMatriz = value
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

    Private _descripcion As String
    Public Property Descripcion As String
        Get
            Return _descripcion
        End Get
        Set(value As String)
            _descripcion = value
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

    Private _elementoInsp As String
    Public Property ElementoInsp As String
        Get
            Return _elementoInsp
        End Get
        Set(value As String)
            _elementoInsp = value
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

    Private _establecimiento As String
    Public Property Establecimiento As String
        Get
            Return _establecimiento
        End Get
        Set(value As String)
            _establecimiento = value
        End Set
    End Property

    Private _cantidadCelda As Integer
    Public Property CantidadCelda
        Get
            Return _cantidadCelda
        End Get
        Set(value)
            _cantidadCelda = value
        End Set
    End Property
End Class
