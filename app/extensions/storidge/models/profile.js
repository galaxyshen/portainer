function StoridgeProfileDefaultModel() {
  this.Directory = '/cio/';
  this.Capacity = 20;
  this.Redundancy = 2;
  this.Provisioning = 'thin';
  this.Type = 'ssd';
  this.MinIOPS = 100;
  this.MaxIOPS = 2000;
  this.MinBandwidth = 1;
  this.MaxBandwidth = 100;
  this.Filesystem = 'btrfs';
  this.SnapshotEnabled = false;
  this.SnapshotInterval = 60;
  this.SnapshotMax = 1;
  this.EncryptionEnabled = false;
  this.InterfaceType = 'nfs';
  this.InterfaceDriver = '';
  this.InterfaceNetwork = '';
  this.InterfaceConf = '';
  this.Labels = [];
}

function StoridgeProfileListModel(data) {
  this.Name = data;
  this.Checked = false;
}

function StoridgeProfileModel(name, data) {
  this.Name = name;
  this.Directory = data.directory;
  this.Capacity = data.capacity;
  this.Provisioning = data.provision;
  this.Type = data.type;
  this.Redundancy = data.level;

  if (data.iops) {
    this.MinIOPS = data.iops.min;
    this.MaxIOPS = data.iops.max;
  }

  if (data.bandwidth) {
    this.MinBandwidth = data.bandwidth.min;
    this.MaxBandwidth = data.bandwidth.max;
  }
}

function StoridgeCreateProfileRequest(model) {
  this.name = model.Name;
  this.capacity = model.Capacity;
  this.directory = model.Directory;
  this.provision = model.Provisioning;
  this.type = model.Type;
  this.level = model.Redundancy;

  this.snapshot = {
    enabled: model.SnapshotEnabled
  };
  if (model.SnapshotEnabled) {
    this.snapshot.interval = model.SnapshotInterval;
    this.snapshot.max = model.SnapshotMax;
  }

  this.encryption = {
    enabled: model.EncryptionEnabled
  };

  this.interface = {
    type: model.InterfaceType,
    driver: model.InterfaceDriver,
    network: model.InterfaceNetwork,
    conf: model.InterfaceConf
  };

  // this.Filesystem = data.Filesystem;
  // this.labels = data.labels;

  if (model.MinIOPS && model.MaxIOPS) {
    this.iops = {
      min: model.MinIOPS,
      max: model.MaxIOPS
    };
  }

  if (model.MinBandwidth && model.MaxBandwidth) {
    this.bandwidth = {
      min: model.MinBandwidth,
      max: model.MaxBandwidth
    };
  }
}
