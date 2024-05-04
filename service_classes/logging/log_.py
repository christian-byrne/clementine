from service_classes.constants import ENV

def plog(msg):
  if ENV == 'DEV':
    print(msg)