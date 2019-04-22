Public Class indicador_monitor

    Private _indicador As String
    Private _valor_optimo_indicador As Double
    Private _operador As String

    Public Property Indicador As String
        Get
            Return _indicador
        End Get
        Set(value As String)
            _indicador = value
        End Set
    End Property
    Public Property Valor_optimo_indicador As Double
        Get
            Return _valor_optimo_indicador
        End Get
        Set(value As Double)
            _valor_optimo_indicador = value
        End Set
    End Property
    Public Property Operador As String
        Get
            Return _operador
        End Get
        Set(value As String)
            _operador = value
        End Set
    End Property


End Class
