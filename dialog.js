Java.perform(function() {
    var MainActivity = Java.use("com.kinemaster.marketplace.ui.main.HomeActivity");
    var System = Java.use('java.lang.System');
    var AlertDialogBuilder = Java.use("android.app.AlertDialog$Builder");
    var DialogInterfaceOnClickListener = Java.use('android.content.DialogInterface$OnClickListener');
    var Html = Java.use("android.text.Html");
    var String = Java.use("java.lang.String");
    
    MainActivity.onCreate.overload("android.os.Bundle")
        .implementation = function(savedInstanceState) {
        var currentActivity = this;
        
        var alert = AlertDialogBuilder.$new(this);
               
        alert.setTitle(String.$new("Modded by kyzsuki"));
        alert.setMessage(Html.fromHtml(String.$new("<b>Follow <a href=\"https://t.me/aidetutorial\">@aidetutorial</a> on telegram for more.</b>")));

        alert.setPositiveButton(String.$new("Dismiss"), Java.registerClass({
            name: 'id.kyzsuki.Main.OnClickListenerPositive',
            implements: [DialogInterfaceOnClickListener],
            methods: {
                getName: function() {
                    return 'OnClickListenerPositive';
                },
                onClick: function(dialog, which) {
                    dialog.dismiss();
                }
            }
        })
            .$new());

        alert.setNegativeButton(String.$new("exit"), Java.registerClass({
            name: 'id.kyzsuki.Main.OnClickListenerNegative',
            implements: [DialogInterfaceOnClickListener],
            methods: {
                getName: function() {
                    return 'OnClickListenerNegative';
                },
                onClick: function(dialog, which) {
                    currentActivity.finish();
                    System.exit(0);
                }
            }
        })
            .$new())

        alert.create()
            .show();
        return this.onCreate.overload("android.os.Bundle")
            .call(this, savedInstanceState);
    };
});