# ip_ranges is a dictionary (keyed off the first octet as an integer) that contains
# a three-tuple of single octet values or two-tuple octet value ranges.
# The dictionary below represents the following ranges:
# 68.24.0.1 - 68.27.255.254
# 68.29.0.1 - 68.29.255.254
# 68.30.0.1 - 68.31.255.254
# 68.240.0.1 - 68.247.255.254
ip_ranges = {
    68:[
        (
            (24,27),(0,255),(1,254),
        ),
        (
            29,(0,255),(1,254),
        ),
        (
            (30,31),(0,255),(1,254),
        ),
        (
            (240,247),(0,255),(1,254),
        ),
        ]
}

from django.http import HttpRequest  
  
def mypage(request):  
    client_address = request.META['HTTP_X_FORWARDED_FOR']
    ip = client_address;

def split_ip(ip):
    """
    Returns a list comprehension of ip address octet values as integers.
    >>> split_ip('10.0.0.1')
    ... [10, 0, 0, 1]
    """
    return [int(x) for x in ip.split('.')]
    
def check_range(ranges, ip):
    """
    Loops through an ip range dictionary determining if the given ip is contained
    within the given ranges.
    """
    in_ranges = True
    count = 1
    for r in ranges:
        if in_ranges:
            if type(r) is tuple:
                if ip[count] in range(r[0], r[1]+1):
                    in_ranges = True
                else:
                    in_ranges = False
            else:
                if r == ip[count]:
                    in_ranges = True
                else:
                    in_ranges = False
            count += 1
    return in_ranges

def is_target_ip(ip):
    """
    Determines whether the given ip matches any of our defined ip ranges.
    """
    ip = split_ip(ip)
    if ip_ranges.has_key(ip[0]):
        ranges = ip_ranges[ip[0]]
        for r in ranges:
            if check_range(r, ip):
                return True
    return False