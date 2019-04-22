Namespace Win_Dashboards
    Partial Public Class Dashboard1
        ''' <summary> 
        ''' Required designer variable.
        ''' </summary>
        Private components As System.ComponentModel.IContainer = Nothing

        ''' <summary> 
        ''' Clean up any resources being used.
        ''' </summary>
        ''' <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        Protected Overrides Sub Dispose(ByVal disposing As Boolean)
            If disposing AndAlso (components IsNot Nothing) Then
                components.Dispose()
            End If
            MyBase.Dispose(disposing)
        End Sub

#Region "Component Designer generated code"

        ''' <summary> 
        ''' Required method for Designer support - do not modify 
        ''' the contents of this method with the code editor.
        ''' </summary>
        Private Sub InitializeComponent()
            Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(Dashboard1))
            Dim DashboardLayoutGroup1 As DevExpress.DashboardCommon.DashboardLayoutGroup = New DevExpress.DashboardCommon.DashboardLayoutGroup()
            Dim DashboardLayoutItem1 As DevExpress.DashboardCommon.DashboardLayoutItem = New DevExpress.DashboardCommon.DashboardLayoutItem()
            Dim DashboardLayoutItem2 As DevExpress.DashboardCommon.DashboardLayoutItem = New DevExpress.DashboardCommon.DashboardLayoutItem()
            Dim DashboardLayoutItem3 As DevExpress.DashboardCommon.DashboardLayoutItem = New DevExpress.DashboardCommon.DashboardLayoutItem()
            Me.ComboBoxDashboardItem1 = New DevExpress.DashboardCommon.ComboBoxDashboardItem()
            Me.GridDashboardItem1 = New DevExpress.DashboardCommon.GridDashboardItem()
            Me.GaugeDashboardItem1 = New DevExpress.DashboardCommon.GaugeDashboardItem()
            CType(Me.ComboBoxDashboardItem1, System.ComponentModel.ISupportInitialize).BeginInit()
            CType(Me.GridDashboardItem1, System.ComponentModel.ISupportInitialize).BeginInit()
            CType(Me.GaugeDashboardItem1, System.ComponentModel.ISupportInitialize).BeginInit()
            CType(Me, System.ComponentModel.ISupportInitialize).BeginInit()
            '
            'ComboBoxDashboardItem1
            '
            Me.ComboBoxDashboardItem1.ComponentName = "ComboBoxDashboardItem1"
            Me.ComboBoxDashboardItem1.DataItemRepository.Clear()
            Me.ComboBoxDashboardItem1.InteractivityOptions.IgnoreMasterFilters = True
            resources.ApplyResources(Me.ComboBoxDashboardItem1, "ComboBoxDashboardItem1")
            Me.ComboBoxDashboardItem1.ShowCaption = True
            '
            'GridDashboardItem1
            '
            Me.GridDashboardItem1.ComponentName = "GridDashboardItem1"
            Me.GridDashboardItem1.DataItemRepository.Clear()
            Me.GridDashboardItem1.InteractivityOptions.IgnoreMasterFilters = False
            resources.ApplyResources(Me.GridDashboardItem1, "GridDashboardItem1")
            Me.GridDashboardItem1.ShowCaption = True
            '
            'GaugeDashboardItem1
            '
            Me.GaugeDashboardItem1.ComponentName = "GaugeDashboardItem1"
            Me.GaugeDashboardItem1.DataItemRepository.Clear()
            Me.GaugeDashboardItem1.InteractivityOptions.IgnoreMasterFilters = False
            resources.ApplyResources(Me.GaugeDashboardItem1, "GaugeDashboardItem1")
            Me.GaugeDashboardItem1.ShowCaption = True
            '
            'Dashboard1
            '
            Me.Items.AddRange(New DevExpress.DashboardCommon.DashboardItem() {Me.ComboBoxDashboardItem1, Me.GridDashboardItem1, Me.GaugeDashboardItem1})
            DashboardLayoutItem1.DashboardItem = Me.ComboBoxDashboardItem1
            DashboardLayoutItem1.Weight = 13.020833333333334R
            DashboardLayoutItem2.DashboardItem = Me.GridDashboardItem1
            DashboardLayoutItem2.Weight = 43.489583333333336R
            DashboardLayoutItem3.DashboardItem = Me.GaugeDashboardItem1
            DashboardLayoutItem3.Weight = 43.489583333333336R
            DashboardLayoutGroup1.ChildNodes.AddRange(New DevExpress.DashboardCommon.DashboardLayoutNode() {DashboardLayoutItem1, DashboardLayoutItem2, DashboardLayoutItem3})
            DashboardLayoutGroup1.DashboardItem = Nothing
            DashboardLayoutGroup1.Orientation = DevExpress.DashboardCommon.DashboardLayoutGroupOrientation.Vertical
            Me.LayoutRoot = DashboardLayoutGroup1
            Me.Title.Text = resources.GetString("Dashboard1.Title.Text")
            CType(Me.ComboBoxDashboardItem1, System.ComponentModel.ISupportInitialize).EndInit()
            CType(Me.GridDashboardItem1, System.ComponentModel.ISupportInitialize).EndInit()
            CType(Me.GaugeDashboardItem1, System.ComponentModel.ISupportInitialize).EndInit()
            CType(Me, System.ComponentModel.ISupportInitialize).EndInit()

        End Sub
        Friend WithEvents ComboBoxDashboardItem1 As DevExpress.DashboardCommon.ComboBoxDashboardItem
        Friend WithEvents GridDashboardItem1 As DevExpress.DashboardCommon.GridDashboardItem
        Friend WithEvents GaugeDashboardItem1 As DevExpress.DashboardCommon.GaugeDashboardItem

#End Region
    End Class
End Namespace