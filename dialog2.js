Java.perform(function() {
    var ActivityThread = Java.use("android.app.ActivityThread");
    var System = Java.use('java.lang.System');
    var AlertDialogBuilder = Java.use("android.app.AlertDialog$Builder");
    var DialogInterfaceOnClickListener = Java.use('android.content.DialogInterface$OnClickListener');
    var Html = Java.use("android.text.Html");
    var String = Java.use("java.lang.String");

    Java.use("android.app.Activity")
        .onCreate.overload("android.os.Bundle")
        .implementation = function(savedInstanceState) {
        var currentActivity = this;

        var application = ActivityThread.currentApplication();
        var launcherIntent = application.getPackageManager()
            .getLaunchIntentForPackage(application.getPackageName());
        var launchActivityInfo = launcherIntent.resolveActivityInfo(application.getPackageManager(), 0);

        if (launchActivityInfo.name.value === this.getComponentName()
            .getClassName()) {

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
            console.warn("create dialog now");
            alert.create()
                .show();
            return this.onCreate.overload("android.os.Bundle")
                .call(this, savedInstanceState);
        };
    };
});