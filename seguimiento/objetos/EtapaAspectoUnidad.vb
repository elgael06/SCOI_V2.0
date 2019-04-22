Public Class EtapaAspectoUnidad
    Private _etapa As String
    Public Property Etapa As String
        Get
            Return _etapa
        End Get
        Set(value As String)
            _etapa = value
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

    Private _unidad As String
    Public Property Unidad As String
        Get
            Return _unidad
        End Get
        Set(value As String)
            _unidad = value
        End Set
    End Property

End Class
