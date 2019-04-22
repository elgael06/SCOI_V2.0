Public Class refrigeradores_incidencias_24_horas

    Private _temperatura As Double
    Private _fecha As String
    Private _hora As String
    Private _limite_superior As Double
    Private _limite_inferior As Double
    Private _estatus As String


    Public Property temperatura As Double
        Get
            Return _temperatura
        End Get
        Set(value As Double)
            _temperatura = value
        End Set
    End Property
    Public Property fecha As String
        Get
            Return _fecha
        End Get
        Set(value As String)
            _fecha = value
        End Set
    End Property

    Public Property hora As String
        Get
            Return _hora
        End Get
        Set(value As String)
            _hora = value
        End Set
    End Property
    Public Property limite_superior As Double
        Get
            Return _limite_superior
        End Get
        Set(value As Double)
            _limite_superior = value
        End Set
    End Property
    Public Property limite_inferior As Double
        Get
            Return _limite_inferior
        End Get
        Set(value As Double)
            _limite_inferior = value
        End Set
    End Property
    Public Property estatus As String
        Get
            Return _estatus
        End Get
        Set(value As String)
            _estatus = value
        End Set
    End Property
End Class
